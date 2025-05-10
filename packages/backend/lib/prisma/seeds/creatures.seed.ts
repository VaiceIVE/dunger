import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

import type { Creature } from '../types/Creature.ts';

const prisma = new PrismaClient();

function getStatMastery(statName: string, stats: string | undefined): boolean {
  if (!stats) return false;
  // Маппинг на русском и английском для статов
  const statMap: { [key: string]: string[] } = {
    charisma: ['Хар', 'Char'],
    constitution: ['Тел', 'Con'],
    dexterity: ['Лов', 'Dex'],
    intelligence: ['Инт', 'Int'],
    wisdom: ['Мдр', 'Муд', 'Wis'],
    strength: ['Сил', 'Str']
  };

  const statAbbreviations = statMap[statName.toLowerCase()];

  if (!statAbbreviations) return false;

  // Проверяем наличие хотя бы одного сокращения в строке
  return statAbbreviations.some((abbr) => stats.includes(abbr));
}

export async function SeedCreatures() {
  const filePath = resolve(import.meta.dirname, '../data/creatures.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const creatures_data: Creature[] = JSON.parse(defaultValuesFile);

  const sources: { id: number; name: string; shortName: string }[] = await prisma.source.findMany();

  for (const creature_data of creatures_data) {
    const creature_actions = [];

    if (creature_data.action) {
      for (const action of creature_data.action) {
        const new_action: { name: string; text: string; attack: string } = { name: '', text: '', attack: '' };
        if (Array.isArray(action.text)) {
          new_action.text = action.text.join(' ');
        } else {
          new_action.text = action.text;
        }
        new_action.name = action.name;
        if ('attack' in action) {
          if (action.attack) {
            if (Array.isArray(action.attack)) {
              new_action.attack = action.attack.join(' ');
            } else {
              new_action.attack = action.attack;
            }
          }
        }
        creature_actions.push(new_action);
      }
    }

    const creature_traits = [];
    if (creature_data.trait) {
      if (!Array.isArray(creature_data.trait)) {
        creature_data.trait = [creature_data.trait];
      }

      for (const trait of creature_data.trait) {
        const new_trait: { name: string; text: string; attack: string } = { name: '', text: '', attack: '' };
        if (Array.isArray(trait.text)) {
          new_trait.text = trait.text.join(' ');
        } else {
          new_trait.text = trait.text;
        }
        new_trait.name = trait.name;
        if ('attack' in trait) {
          if (trait.attack) {
            if (Array.isArray(trait.attack)) {
              new_trait.attack = trait.attack.join(' ');
            } else {
              new_trait.attack = trait.attack;
            }
          }
        }
        creature_traits.push(new_trait);
      }
    }

    let creature_immunities: string[] = [];
    if (creature_data.immune) {
      const parts = creature_data.immune.split(';');
      creature_immunities = parts.length > 1 ? [parts[1]] : [];
      creature_immunities = creature_immunities.concat(parts[0].split(', '));
    }

    let creature_vunlerabilities: string[] = [];
    if (creature_data.vulnerable) {
      const parts = creature_data.vulnerable.split(';');
      creature_vunlerabilities = parts.length > 1 ? [parts[1]] : [];
      creature_vunlerabilities = creature_vunlerabilities.concat(parts[0].split(', '));
    }

    let creature_resistances: string[] = [];
    if (creature_data.resist) {
      const parts = creature_data.resist.split(';');
      creature_resistances = parts.length > 1 ? [parts[1]] : [];
      creature_resistances = creature_resistances.concat(parts[0].split(', '));
    }

    let creature_biomes: string[] = [];
    if (creature_data.biom) {
      creature_biomes = creature_data.biom.replaceAll(',', '').replaceAll(';', '').split(' ');
    }
    const biomes = await prisma.biome.findMany({
      where: {
        key: {
          in: creature_biomes
        }
      }
    });

    const speeds_strings = creature_data.speed.split(',');
    const creature_speeds: { walk?: number; fly?: number; swim?: number; climb?: number; burrow?: number } = {};
    for (const speed_string of speeds_strings) {
      const split_string = speed_string.split(' ');
      if (split_string[0] == 'плавая' || split_string[0] == 'swim') {
        creature_speeds.swim = +split_string[1] * 5;
      }
      if (split_string[0] == 'полет' || split_string[0] == 'fly') {
        creature_speeds.fly = +split_string[1] * 5;
      }
      if (split_string[0] == 'лазание' || split_string[0] == 'climb' || split_string[0] == 'карабкаясь') {
        creature_speeds.climb = +split_string[1] * 5;
      }
      if (!isNaN(parseFloat(split_string[0]))) {
        creature_speeds.walk = +split_string[0] * 5;
      }
      if (split_string[0] == 'burrow') {
        creature_speeds.burrow = +split_string[1] * 5;
      }
    }

    const creature_skills: {
      arcana?: number;
      athletics?: number;
      acrobatics?: number;
      sleight_of_hand?: number;
      stealth?: number;
      history?: number;
      investigation?: number;
      nature?: number;
      religion?: number;
      animal_handling?: number;
      insight?: number;
      medicine?: number;
      perception?: number;
      survival?: number;
      deception?: number;
      intimidation?: number;
      performance?: number;
      persuasion?: number;
    } = {};
    if (creature_data.skill) {
      const creature_skills_list = creature_data.skill.split(', ');
      for (const skill of creature_skills_list) {
        if (skill.split(' ')[0] == 'Магия' || skill.split(' ')[0] == 'Arcana') {
          creature_skills.arcana = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'История' || skill.split(' ')[0] == 'History') {
          creature_skills.history = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Атлетика' || skill.split(' ')[0] == 'Athletics') {
          creature_skills.athletics = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Акробатика' || skill.split(' ')[0] == 'Acrobatics') {
          creature_skills.acrobatics = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Ловкость рук' || skill.split(' ')[0] == 'Sleight of Hand') {
          creature_skills.sleight_of_hand = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Скрытность' || skill.split(' ')[0] == 'Stealth') {
          creature_skills.stealth = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Расследование' || skill.split(' ')[0] == 'Investigation') {
          creature_skills.investigation = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Природа' || skill.split(' ')[0] == 'Nature') {
          creature_skills.nature = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Религия' || skill.split(' ')[0] == 'Religion') {
          creature_skills.religion = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Уход за животными' || skill.split(' ')[0] == 'Animal handling') {
          creature_skills.animal_handling = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Проницательность' || skill.split(' ')[0] == 'Insight') {
          creature_skills.insight = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Медицина' || skill.split(' ')[0] == 'Medicine') {
          creature_skills.medicine = +skill.split(' ')[1];
        }
        if (
          skill.split(' ')[0] == 'Восприятие' ||
          skill.split(' ')[0] == 'Perception' ||
          skill.split(' ')[0] == 'Внимательность'
        ) {
          creature_skills.perception = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Выживание' || skill.split(' ')[0] == 'Survival') {
          creature_skills.survival = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Обман' || skill.split(' ')[0] == 'Deception') {
          creature_skills.deception = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Запугивание' || skill.split(' ')[0] == 'Intimidation') {
          creature_skills.intimidation = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Исполнение' || skill.split(' ')[0] == 'Performance') {
          creature_skills.performance = +skill.split(' ')[1];
        }
        if (skill.split(' ')[0] == 'Соблазнение' || skill.split(' ')[0] == 'Persuasion') {
          creature_skills.persuasion = +skill.split(' ')[1];
        }
      }
    }

    await prisma.creature.create({
      data: {
        name: creature_data.name,
        description: creature_data.fiction,
        challenge_rating: creature_data.cr,
        armor_class: +creature_data.ac.split(' ')[0],
        hit_points: +creature_data.hp.split(' ')[0],
        source_relation: { connect: { id: sources.find((s) => s.shortName === creature_data.source)!.id } },
        size_relation: {
          connect: {
            id: creature_data.size
          }
        },
        alignment_relation: creature_data.alignment
          ? {
              connect: {
                name: creature_data.alignment
              }
            }
          : {},
        actions: creature_actions
          ? {
              connectOrCreate: creature_actions.map((action) => ({
                where: { description: action.text },
                create: { description: action.text, name: action.name, is_template: false }
              }))
            }
          : {},
        traits: creature_traits
          ? {
              connectOrCreate: creature_traits.map((trait) => ({
                where: { description: trait.text },
                create: { description: trait.text, name: trait.name, is_template: false }
              }))
            }
          : {},
        immunities: creature_immunities
          ? { connect: creature_immunities.map((immunity) => ({ name: immunity.trim().toLowerCase() })) }
          : {},
        resistances: creature_resistances
          ? { connect: creature_resistances.map((resistance) => ({ name: resistance.trim().toLowerCase() })) }
          : {},
        vulnerabilities: creature_vunlerabilities
          ? {
              connect: creature_vunlerabilities.map((vunlarability) => ({ name: vunlarability.trim().toLowerCase() }))
            }
          : {},
        biomes_ids: biomes.map((b) => b.id),
        senses: {
          create: {
            passive_perception: +creature_data.passive
          }
        },
        skills: creature_skills
          ? {
              create: {
                charisma: {
                  create: {
                    deception: creature_skills.deception
                      ? {
                          create: {
                            value: creature_skills.deception,
                            mastery: true
                          }
                        }
                      : {},
                    intimidation: creature_skills.intimidation
                      ? {
                          create: {
                            value: creature_skills.intimidation,
                            mastery: true
                          }
                        }
                      : {},
                    performance: creature_skills.performance
                      ? {
                          create: {
                            value: creature_skills.performance,
                            mastery: true
                          }
                        }
                      : {},
                    persuasion: creature_skills.persuasion
                      ? {
                          create: {
                            value: creature_skills.persuasion,
                            mastery: true
                          }
                        }
                      : {}
                  }
                },
                dexterity: {
                  create: {
                    acrobatics: creature_skills.acrobatics
                      ? {
                          create: {
                            value: creature_skills.acrobatics,
                            mastery: true
                          }
                        }
                      : {},
                    sleight_of_hand: creature_skills.sleight_of_hand
                      ? {
                          create: {
                            value: creature_skills.sleight_of_hand,
                            mastery: true
                          }
                        }
                      : {},
                    stealth: creature_skills.stealth
                      ? {
                          create: {
                            value: creature_skills.stealth,
                            mastery: true
                          }
                        }
                      : {}
                  }
                },
                intelligence: {
                  create: {
                    arcana: creature_skills.arcana
                      ? {
                          create: {
                            value: creature_skills.arcana,
                            mastery: true
                          }
                        }
                      : {},
                    history: creature_skills.history
                      ? {
                          create: {
                            value: creature_skills.history,
                            mastery: true
                          }
                        }
                      : {},
                    investigation: creature_skills.investigation
                      ? {
                          create: {
                            value: creature_skills.investigation,
                            mastery: true
                          }
                        }
                      : {},
                    nature: creature_skills.nature
                      ? {
                          create: {
                            value: creature_skills.nature,
                            mastery: true
                          }
                        }
                      : {},
                    religion: creature_skills.religion
                      ? {
                          create: {
                            value: creature_skills.religion,
                            mastery: true
                          }
                        }
                      : {}
                  }
                },
                strength: {
                  create: {
                    athletics: creature_skills.athletics
                      ? {
                          create: {
                            value: creature_skills.athletics,
                            mastery: true
                          }
                        }
                      : {}
                  }
                },
                wisdom: {
                  create: {
                    animal_handling: creature_skills.animal_handling
                      ? {
                          create: {
                            value: creature_skills.animal_handling,
                            mastery: true
                          }
                        }
                      : {},
                    insight: creature_skills.insight
                      ? {
                          create: {
                            value: creature_skills.insight,
                            mastery: true
                          }
                        }
                      : {},
                    medicine: creature_skills.medicine
                      ? {
                          create: {
                            value: creature_skills.medicine,
                            mastery: true
                          }
                        }
                      : {},
                    perception: creature_skills.perception
                      ? {
                          create: {
                            value: creature_skills.perception,
                            mastery: true
                          }
                        }
                      : {},
                    survival: creature_skills.survival
                      ? {
                          create: {
                            value: creature_skills.survival,
                            mastery: true
                          }
                        }
                      : {}
                  }
                }
              }
            }
          : {},
        speed: creature_speeds
          ? {
              create: creature_speeds
            }
          : {},
        stats: {
          create: {
            charisma: {
              create: {
                value: +creature_data.cha,
                mastery: getStatMastery('charisma', creature_data.save)
              }
            },
            constitution: {
              create: {
                value: +creature_data.con,
                mastery: getStatMastery('constitution', creature_data.save)
              }
            },
            dexterity: {
              create: {
                value: +creature_data.dex,
                mastery: getStatMastery('dexterity', creature_data.save)
              }
            },
            intelligence: {
              create: {
                value: +creature_data.int,
                mastery: getStatMastery('intelligence', creature_data.save)
              }
            },
            strength: {
              create: {
                value: +creature_data.str,
                mastery: getStatMastery('strength', creature_data.save)
              }
            },
            wisdom: {
              create: {
                value: +creature_data.wis,
                mastery: getStatMastery('wisdom', creature_data.save)
              }
            }
          }
        },
        type_relation: creature_data.sType
          ? {
              connect: {
                name: creature_data.sType
              }
            }
          : {}
        // languages: creature_data.languages ? {
        //     connect: {
        //         name: creature_data.languages
        //     }
        // } : {}
      }
    });
  }
}
