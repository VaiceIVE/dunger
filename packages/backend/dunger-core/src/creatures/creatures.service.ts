import { Injectable } from '@nestjs/common';
import { CreateCreatureManualDto } from './dto/createCreatureManual.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationQureiedQuery } from 'src/app/dto/queries/paginationQueriedQuery';
import { PaginationQuery } from 'src/app/dto/queries/paginationQuery';
import { ApiCreatureInput } from './dto/stolen_types/ApiCreatureInput';
import { skip } from 'node:test';
import { ApiCreature } from './dto/stolen_types/ApiCreature';
import { nullSkillsObject } from './objects/nullSkills.object';
import { nullSpeedObject } from './objects/nullSpeed.object';
import { nullStatObject } from './objects/nullStat.objecxt';
import { nullSensesObject } from './objects/nullSenses.object';

@Injectable()
export class CreaturesService {
  constructor(private readonly prisma: PrismaClient) {}

  async initCreature(createCreatureDto: CreateCreatureManualDto) {
    if (
      createCreatureDto.template_id != null &&
      createCreatureDto.template_id != undefined
    ) {
      const template = await this.prisma.creature.findUnique({
        where: { id: createCreatureDto.template_id },
      });
      delete template.id;
      template.name = createCreatureDto.name;
      template.challenge_rating = createCreatureDto.challenge_rating;
      return await this.prisma.creature.create({
        data: template,
        select: {
          id: true,
        },
      });
    }
    return await this.prisma.creature.create({
      data: {
        name: createCreatureDto.name,
        challenge_rating: createCreatureDto.challenge_rating,
      },
      select: {
        id: true,
      },
    });
  }

  findAll() {
    return `This action returns all creatures`;
  }

  async findSome(query: PaginationQureiedQuery){
    let results = []
    let total = 0
    if(query.query){
      results = await this.prisma.creature.findMany({
        select: {
          id: true
        },
        where: {
          name: {
            contains: query.query
          }
        },
        skip: query.offset,
        take: query.limit
      })
      total = await this.prisma.creature.count({
        where: {
          name: {
            contains: query.query
          }
        }
      })
    }else{
      results = await this.prisma.creature.findMany({
        select: {
          id: true
        },
        skip: query.offset,
        take: query.limit
      })
      total = await this.prisma.creature.count()
    }

    let final_results = []

    for(const result of results){
      final_results.push(await this.selectCreatureForCard(result.id))
    }

    console.log('this was final results')
    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total
      },
      results: final_results,
    }
    
  }

  async findTemplates(query: PaginationQureiedQuery){
    let results = []
    let total = 0
    if(query.query){
      results = await this.prisma.creature.findMany({
        select: {
          id: true
        },
        where: {
          name: {
            contains: query.query
          }
        },
        select: {
          name: true,
          id: true
        },
        skip: query.offset,
        take: query.limit
      })
      total = await this.prisma.creature.count({
        where: {
          name: {
            contains: query.query
          }
        }
      })
    }else{
      results = await this.prisma.creature.findMany({
        select: {
          name: true,
          id: true
        },
        skip: query.offset,
        take: query.limit
      })
      total = await this.prisma.creature.count()
    }

    let final_results = []

    for(const result of results){
      final_results.push(await this.selectCreatureForCard(result.id))
    }

    console.log('this was final results')
    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total
      },
      results: results,
    }
    
  }

  async findTypes(){
    return await this.prisma.type.findMany({
      select: {
        id: true,
        name: true
      }
    })
  }

  async findAlignment(){
    return await this.prisma.alignment.findMany()
  }

  async findSizes() {
    return await this.prisma.size.findMany();
  }

  async findBimes() {
    return await this.prisma.biome.findMany({});
  }

  async findDamageType() {
    return await this.prisma.damageType.findMany();
  }

  async findOne(id: string) {
    return this.selectCreatureForCard(id);
  }
  async findLanguages(query: PaginationQureiedQuery) {
    let results = [];
    let total = 0;
    if (query.query) {
      results = await this.prisma.language.findMany({
        where: {
          name: {
            contains: query.query,
          },
        },
        select: {
          name: true,
          id: true,
        },
        skip: query.offset,
        take: query.limit,
      });
      total = await this.prisma.language.count({
        where: {
          name: {
            contains: query.query,
          },
        },
      });
    } else {
      results = await this.prisma.language.findMany({
        select: {
          name: true,
          id: true,
        },
        skip: query.offset,
        take: query.limit,
      });
      total = await this.prisma.language.count();
    }

    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total,
      },
      results: results,
    };
  }

  async findCR() {
    return await this.prisma.challengeRating.findMany();
  }

  async findSkills() {
    return await this.prisma.skillsList.findMany();
  }

  async findTraitsGroups(query: PaginationQureiedQuery) {
    let results;
    let total;
    if (query.query) {
      results = await this.prisma.trait.groupBy({
        by: ['name'],
        where: {
          name: {
            contains: query.query
          },
          is_template: true
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });
      total = await this.prisma.trait.groupBy({
        by: ['name'],
        _count: true,
      });
      total = total.length;
    } else {
      results = await this.prisma.trait.groupBy({
        by: ['name'],
        where: {
          is_template: true
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });
      total = await this.prisma.trait.groupBy({
        by: ['name'],
      });
      total = total.length;
    }

    results = results.slice(query.offset, query.offset + query.limit);

    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total,
      },
      results: results.map((res) => ({ count: res._count.id, name: res.name })),
    };
  }

  async findActionsGroups(query: PaginationQureiedQuery) {
    let results;
    let total;
    if (query.query) {
      results = await this.prisma.action.groupBy({
        by: ['name'],
        where: {
          name: {
            contains: query.query
          },
          is_template: true
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });
      total = await this.prisma.action.groupBy({
        by: ['name'],
        _count: true,
      });
      total = total.length;
    } else {
      results = await this.prisma.action.groupBy({
        by: ['name'],
        _count: {
          id: true
        },
        where: {
          is_template: true
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });
      total = await this.prisma.action.groupBy({
        by: ['name'],
      });
      total = total.length;
    }

    results = results.slice(query.offset, query.offset + query.limit);

    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total,
      },
      results: results.map((res) => ({ count: res._count.id, name: res.name })),
    };
  }

  async findTraitsGroup(groupName: string) {
    return await this.prisma.trait.findMany({
      where: {
        name: groupName,
        is_template: true
      }
    })
  }

  async findActionsGroup(groupName: string) {
    return await this.prisma.action.findMany({
      where: {
        name: groupName,
        is_template: true
      }
    })
  }

  private cleanObj(obj) {
    var newobj = {};
    const complexPropnames = [
      'speed',
      'stats',
      'skills',
      'languages_ids',
      'actions_ids',
      'traits_ids',
      'size_id',
      'resistances_ids',
      'immunities_ids',
      'vulnerabilities_ids',
      'resistances',
      'immunities',
      'vulnerabilities',
      'senses',
      'languages',
      'alignment_relation',
      'type_relation',
      'size_relation',
      'biome_relation',
      'race_relation',
    ];
    for (var propname in obj) {
      if (
        !(
          obj[propname] === null ||
          obj[propname] === undefined ||
          complexPropnames.includes(propname)
        )
      ) {
        newobj[propname] = obj[propname];
      }
    }
    return newobj;
  }

  async update(id: string, updateCreatureDto: ApiCreatureInput) {
    const cleanedUpdatedCreatureDto = this.cleanObj(updateCreatureDto);
    await this.prisma.creature.update({
      where: { id: id },
      data: {
        ...cleanedUpdatedCreatureDto,
      },
    });
    if (updateCreatureDto.size_id) {
      await this.prisma.creature.update({
        where: {
          id: id,
        },
        data: {
          size_relation: {
            connect: {
              id: updateCreatureDto.size_id,
            },
          },
        },
      });
    }
    if (updateCreatureDto.senses) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          senses: {
            upsert: {
              where: { creature_id: id },
              create: updateCreatureDto.senses,
              update: {
                passive_perception: updateCreatureDto.senses.passive_perception,
              },
            },
          },
        },
      });
    }
    if (updateCreatureDto.alignment_relation) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          alignment_relation: {
            connect: {
              name: updateCreatureDto.alignment_relation.name,
            },
          },
        },
      });
    }
    if (updateCreatureDto.type_relation) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          type_relation: {
            connect: {
              name: updateCreatureDto.type_relation.name,
            },
          },
        },
      });
    }
    if (updateCreatureDto.size_relation) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          size_relation: {
            connect: {
              id: updateCreatureDto.size_relation.name,
            },
          },
        },
      });
    }
    if (updateCreatureDto.biome_relation) {
      for (const biome of updateCreatureDto.biome_relation) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            biome_relation: {
              connect: {
                title: biome.title,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.languages) {
      for (const lang of updateCreatureDto.languages) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            languages: {
              set: [],
              connectOrCreate: {
                create: {
                  name: lang.name,
                },
                where: {
                  name: lang.name,
                },
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.speed) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          speed: {
            upsert: {
              where: {
                id_relation: {
                  id: id,
                },
              },
              create: updateCreatureDto.speed,
              update: this.cleanObj(updateCreatureDto.speed),
            },
          },
        },
      });
    }
    if (updateCreatureDto.stats) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          stats: {
            upsert: {
              where: { id: id },
              create: {
                strength: {
                  create: {
                    mastery: updateCreatureDto.stats.strength.mastery,
                    value: updateCreatureDto.stats.strength.value,
                  },
                },
                dexterity: {
                  create: {
                    mastery: updateCreatureDto.stats.dexterity.mastery,
                    value: updateCreatureDto.stats.dexterity.value,
                  },
                },
                constitution: {
                  create: {
                    mastery: updateCreatureDto.stats.constitution.mastery,
                    value: updateCreatureDto.stats.constitution.value,
                  },
                },
                intelligence: {
                  create: {
                    mastery: updateCreatureDto.stats.intelligence.mastery,
                    value: updateCreatureDto.stats.intelligence.value,
                  },
                },
                wisdom: {
                  create: {
                    mastery: updateCreatureDto.stats.wisdom.mastery,
                    value: updateCreatureDto.stats.wisdom.value,
                  },
                },
                charisma: {
                  create: {
                    mastery: updateCreatureDto.stats.charisma.mastery,
                    value: updateCreatureDto.stats.charisma.value,
                  },
                },
              },
              update: {
                strength: {
                  update: {
                    mastery: updateCreatureDto.stats.strength.mastery,
                    value: updateCreatureDto.stats.strength.value,
                  },
                },
                dexterity: {
                  update: {
                    mastery: updateCreatureDto.stats.dexterity.mastery,
                    value: updateCreatureDto.stats.dexterity.value,
                  },
                },
                constitution: {
                  update: {
                    mastery: updateCreatureDto.stats.constitution.mastery,
                    value: updateCreatureDto.stats.constitution.value,
                  },
                },
                intelligence: {
                  update: {
                    mastery: updateCreatureDto.stats.intelligence.mastery,
                    value: updateCreatureDto.stats.intelligence.value,
                  },
                },
                wisdom: {
                  update: {
                    mastery: updateCreatureDto.stats.wisdom.mastery,
                    value: updateCreatureDto.stats.wisdom.value,
                  },
                },
                charisma: {
                  update: {
                    mastery: updateCreatureDto.stats.charisma.mastery,
                    value: updateCreatureDto.stats.charisma.value,
                  },
                },
              },
            },
          },
        },
      });
    }
    if (updateCreatureDto.skills) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          skills: {
            upsert: {
              where: { id: id },
              create: {
                charisma: {
                  create: {
                    deception: {
                      create: updateCreatureDto.skills.charisma.deception,
                    },
                    intimidation: {
                      create: updateCreatureDto.skills.charisma.intimidation,
                    },
                    performance: {
                      create: updateCreatureDto.skills.charisma.performance,
                    },
                    persuasion: {
                      create: updateCreatureDto.skills.charisma.persuasion,
                    },
                  },
                },
                dexterity: {
                  create: {
                    acrobatics: {
                      create: updateCreatureDto.skills.dexterity.acrobatics,
                    },
                    sleight_of_hand: {
                      create:
                        updateCreatureDto.skills.dexterity.sleight_of_hand,
                    },
                    stealth: {
                      create: updateCreatureDto.skills.dexterity.stealth,
                    },
                  },
                },
                intelligence: {
                  create: {
                    arcana: {
                      create: updateCreatureDto.skills.intelligence.arcana,
                    },
                    history: {
                      create: updateCreatureDto.skills.intelligence.history,
                    },
                    investigation: {
                      create:
                        updateCreatureDto.skills.intelligence.investigation,
                    },
                    nature: {
                      create: updateCreatureDto.skills.intelligence.nature,
                    },
                    religion: {
                      create: updateCreatureDto.skills.intelligence.religion,
                    },
                  },
                },
                strength: {
                  create: {
                    athletics: {
                      create: updateCreatureDto.skills.strength.athletics,
                    },
                  },
                },
                wisdom: {
                  create: {
                    animal_handling: {
                      create: updateCreatureDto.skills.wisdom.animal_handling,
                    },
                    insight: {
                      create: updateCreatureDto.skills.wisdom.insight,
                    },
                    medicine: {
                      create: updateCreatureDto.skills.wisdom.medicine,
                    },
                    perception: {
                      create: updateCreatureDto.skills.wisdom.perception,
                    },
                    survival: {
                      create: updateCreatureDto.skills.wisdom.survival,
                    },
                  },
                },
              },
              update: {
                charisma: {
                  update: {
                    deception: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.deception,
                        update: updateCreatureDto.skills.charisma.deception,
                      },
                    },
                    intimidation: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.intimidation,
                        update: updateCreatureDto.skills.charisma.intimidation,
                      },
                    },
                    performance: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.performance,
                        update: updateCreatureDto.skills.charisma.performance,
                      },
                    },
                    persuasion: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.persuasion,
                        update: updateCreatureDto.skills.charisma.persuasion,
                      },
                    },
                  },
                },
                dexterity: {
                  update: {
                    acrobatics: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.dexterity.acrobatics,
                        update: updateCreatureDto.skills.dexterity.acrobatics,
                      },
                    },
                    sleight_of_hand: {
                      upsert: {
                        where: { id: id },
                        create:
                          updateCreatureDto.skills.dexterity.sleight_of_hand,
                        update:
                          updateCreatureDto.skills.dexterity.sleight_of_hand,
                      },
                    },
                    stealth: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.dexterity.stealth,
                        update: updateCreatureDto.skills.dexterity.stealth,
                      },
                    },
                  },
                },
                intelligence: {
                  update: {
                    arcana: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.arcana,
                        update: updateCreatureDto.skills.intelligence.arcana,
                      },
                    },
                    history: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.history,
                        update: updateCreatureDto.skills.intelligence.history,
                      },
                    },
                    investigation: {
                      upsert: {
                        where: { id: id },
                        create:
                          updateCreatureDto.skills.intelligence.investigation,
                        update:
                          updateCreatureDto.skills.intelligence.investigation,
                      },
                    },
                    nature: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.nature,
                        update: updateCreatureDto.skills.intelligence.nature,
                      },
                    },
                    religion: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.religion,
                        update: updateCreatureDto.skills.intelligence.religion,
                      },
                    },
                  },
                },
                strength: {
                  update: {
                    athletics: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.strength.athletics,
                        update: updateCreatureDto.skills.strength.athletics,
                      },
                    },
                  },
                },
                wisdom: {
                  update: {
                    animal_handling: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.animal_handling,
                        update: updateCreatureDto.skills.wisdom.animal_handling,
                      },
                    },
                    insight: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.insight,
                        update: updateCreatureDto.skills.wisdom.insight,
                      },
                    },
                    medicine: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.medicine,
                        update: updateCreatureDto.skills.wisdom.medicine,
                      },
                    },
                    perception: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.perception,
                        update: updateCreatureDto.skills.wisdom.perception,
                      },
                    },
                    survival: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.survival,
                        update: updateCreatureDto.skills.wisdom.survival,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
    if (updateCreatureDto.languages_ids) {
      await this.prisma.creature.update({
        where: {
          id: id,
        },
        data: {
          languages: {
            set: [],
          },
        },
      });
      for (var language_id of updateCreatureDto.languages_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            languages: {
              connect: {
                id: language_id,
              },
            },
          },
        });
      }
    }

    if (updateCreatureDto.resistances_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          resistances: {
            set: [],
          },
        },
      });
      for (const resistance_id of updateCreatureDto.resistances_ids) {
        await this.prisma.creature.update({
          where: {
            id: id,
          },
          data: {
            resistances: {
              connect: {
                id: resistance_id,
              },
            },
          },
        });
      }
    }

    if (updateCreatureDto.immunities_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          immunities: {
            set: [],
          },
        },
      });
      for (const immunity_id of updateCreatureDto.immunities_ids) {
        await this.prisma.creature.update({
          where: {
            id: id,
          },
          data: {
            immunities: {
              connect: {
                id: immunity_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.vulnerabilities_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          vulnerabilities: {
            set: [],
          },
        },
      });
      for (const vunlerability_id of updateCreatureDto.vulnerabilities_ids) {
        await this.prisma.creature.update({
          where: {
            id: id,
          },
          data: {
            vulnerabilities: {
              connect: {
                id: vunlerability_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.actions_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          actions: {
            set: [],
          },
        },
      });
      for (const action_id of updateCreatureDto.actions_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            actions: {
              connect: {
                id: action_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.traits_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          traits: {
            set: [],
          },
        },
      });
      for (const trait_id of updateCreatureDto.actions_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            traits: {
              connect: {
                id: trait_id,
              },
            },
          },
        });
      }
    }
    return this.selectCreatureForCard(id);
  }

  private async selectCreatureForCard(creatureId: string) {
    let result = await this.prisma.creature.findUnique({
      where: {
        id: creatureId,
      },
      include: {
        alignment_relation: true,
        biome_relation: true,
        race_relation: true,
        size_relation: true,
        type_relation: true,
        immunities: true,
        resistances: true,
        vulnerabilities: true,
        speed: {
          omit: {
            id: true,
          },
        },
        skills: {
          omit: {
            id: true,
          },
          include: {
            charisma: {
              include: {
                deception: {
                  omit: {
                    id: true,
                  },
                },
                intimidation: {
                  omit: {
                    id: true,
                  },
                },
                performance: {
                  omit: {
                    id: true,
                  },
                },
                persuasion: {
                  omit: {
                    id: true,
                  },
                },
              },
              omit: {
                id: true,
              },
            },
            dexterity: {
              include: {
                acrobatics: {
                  omit: {
                    id: true,
                  },
                },
                sleight_of_hand: {
                  omit: {
                    id: true,
                  },
                },
                stealth: {
                  omit: {
                    id: true,
                  },
                },
              },
              omit: {
                id: true,
              },
            },
            intelligence: {
              include: {
                arcana: {
                  omit: {
                    id: true,
                  },
                },
                history: {
                  omit: {
                    id: true,
                  },
                },
                investigation: {
                  omit: {
                    id: true,
                  },
                },
                nature: {
                  omit: {
                    id: true,
                  },
                },
                religion: {
                  omit: {
                    id: true,
                  },
                },
              },
              omit: {
                id: true,
              },
            },
            strength: {
              include: {
                athletics: {
                  omit: {
                    id: true,
                  },
                },
              },
              omit: {
                id: true,
              },
            },
            wisdom: {
              include: {
                animal_handling: {
                  omit: {
                    id: true,
                  },
                },
                insight: {
                  omit: {
                    id: true,
                  },
                },
                medicine: {
                  omit: {
                    id: true,
                  },
                },
                perception: {
                  omit: {
                    id: true,
                  },
                },
                survival: {
                  omit: {
                    id: true,
                  },
                },
              },
              omit: {
                id: true,
              },
            },
          },
        },
        stats: {
          omit: {
            id: true,
          },
          include: {
            charisma: {
              omit: {
                statblock_id: true,
              },
            },
            constitution: {
              omit: {
                statblock_id: true,
              },
            },
            dexterity: {
              omit: {
                statblock_id: true,
              },
            },
            intelligence: {
              omit: {
                statblock_id: true,
              },
            },
            strength: {
              omit: {
                statblock_id: true,
              },
            },
            wisdom: {
              omit: {
                statblock_id: true,
              },
            },
          },
        },
        senses: {
          omit: {
            creature_id: true,
          },
        },
        actions: true,
        traits: true,
        languages: true,
      },
    });

    console.log(result);

    return {
      actions: result.actions ? result.actions : [],
      alignment_id: result.alignment_relation
        ? result.alignment_relation.id
        : null,
      alignment_name: result.alignment_relation
        ? result.alignment_relation.name
        : null,
      armor_class: result.armor_class,
      armor_type_id: null, //TODO
      armor_type_name: null, //TODO
      biomes: result.biome_relation
        ? result.biome_relation.map((biome) => ({
            id: biome.id,
            name: biome.title,
          }))
        : [],
      biomes_ids: result.biome_relation
        ? result.biome_relation.map((biome) => biome.id)
        : [],
      challenge_rating: result.challenge_rating,
      description: result.description,
      generation_info: null,
      hit_points: result.hit_points,
      id: result.id,
      immunities: result.immunities,
      immunities_ids: result.immunities
        ? result.immunities.map((imm) => imm.id)
        : [],
      languages: result.languages ? result.languages : [],
      languages_ids: result.languages
        ? result.languages.map((lang) => lang.id)
        : [],
      name: result.name,
      resistances: result.resistances,
      resistances_ids: result.resistances
        ? result.resistances.map((res) => res.id)
        : [],
      senses: result.senses ?? nullSensesObject,
      size_id: result.size_relation ? result.size_relation.id : null,
      size_name: result.size_relation ? result.size_relation.name : null,
      skills: result.skills ? result.skills : nullSkillsObject,
      speed: result.speed ? result.speed : nullSpeedObject,
      stats: result.stats ? result.stats : nullStatObject,
      traits: result.traits ? result.traits : [],
      type_id: result.type_relation ? result.type_relation.id : null,
      type_name: result.type_relation ? result.type_relation.name : null,
      vulnerabilities: result.vulnerabilities ? result.vulnerabilities : [],
      vulnerabilities_ids: result.vulnerabilities ? result.vulnerabilities.map(vun => vun.id) : []
    } //as ApiCreature
  }

  remove(id: number) {
    return `This action removes a #${id} creature`;
  }
}
