import { Injectable } from '@nestjs/common';
import * as statsTable from '../constants/creaturesStats.json';
import * as transformTable from '../constants/cr_levels_grades.json';
@Injectable()
export class PromptService {
  getCreaturePrompt(
    name: string,
    challenge_rating: string,
    type: string,
    creation_description?: string,
    role?: 'OFFENCE' | 'DEFENCE',
  ) {
    const base = challenge_rating;
    const up = transformTable.upgrade[challenge_rating];
    const down = transformTable.downgrade[challenge_rating];

    const bonus = statsTable[base].bonus;
    const save_dc = statsTable[base].save_dc;

    const armor_class =
      role === 'DEFENCE'
        ? statsTable[up].armor_class
        : role === 'OFFENCE'
          ? statsTable[down].armor_class
          : statsTable[base].armor_class;

    const hit_points =
      role === 'DEFENCE'
        ? statsTable[up].hit_points
        : role === 'OFFENCE'
          ? statsTable[down].hit_points
          : statsTable[base].hit_points;

    const attack_bonus =
      role === 'DEFENCE'
        ? statsTable[down].attack_bonus
        : role === 'OFFENCE'
          ? statsTable[up].attack_bonus
          : statsTable[base].attack_bonus;

    const damage_per_round =
      role === 'DEFENCE'
        ? statsTable[down].damage_per_round
        : role === 'OFFENCE'
          ? statsTable[up].damage_per_round
          : statsTable[base].damage_per_round;

    return `Ты выступаешь в роли генератора-помошника для создания существ для настольной ролевой игры Подземелья и драконы. 
        Твоя задача - составить существо на основе следующих изначальных характеристик: 
        имя - ${name}, 
        класс опасности - ${challenge_rating}, 
        тип существа - ${type}, 
        ${creation_description ? 'входное описание существа: ' + creation_description : ''}, 
        роль существа в бою: ${role ? role : 'обычный рядовой противник'}
        бонус мастерства существа: ${bonus},
        рекомендуемый класс брони существа: ${armor_class},
        рекомендуемое количество здоровья существа: ${hit_points},
        рекомендуемый бонус атаки существа: ${attack_bonus},
        рекомендуемый средний урон существа в ход: ${damage_per_round},
        рекомендуемай сложность спасброска от способностей существа, если они есть: ${save_dc},
        Необходимый формат данных в котором нужно предоставить данные о существе:
        name String - входное имя существа
        description: String? — новое, уникальное описание существа (до 300 символов), написанное на основе входного описания. Не копируй и не перефразируй его дословно.
        speed Speed_stat? - тип Speed_stat: walk Int?  fly Int?  swim Int?  burrow Int?  climb Int?, некоторые поля тут могут не существовать
        armor_class Int?
        hit_points Int?
        stats Creature_stats? - тип Creature_stats: strength {value Int  mastery Boolean}   dexterity {value Int  mastery Boolean}   constitution {value Int  mastery Boolean}   intelligence {value Int  mastery Boolean}   wisdom {value Int  mastery Boolean}   charisma {value Int  mastery Boolean} 
        skills SkillsList? - 
        тип SkillsList: 
        strength {athletics {value Int  mastery Boolean}}  
        dexterity {acrobatics { value Int  mastery Boolean}  sleight_of_hand { value Int  mastery Boolean}  stealth { value Int  mastery Boolean}}  
        intelligence {arcana { value Int  mastery Boolean}  history { value Int  mastery Boolean}  investigation { value Int  mastery Boolean}  nature { value Int  mastery Boolean}  religion { value Int  mastery Boolean}}  
        wisdom {animal_handling { value Int  mastery Boolean}  insight { value Int  mastery Boolean}  medicine { value Int  mastery Boolean}  perception { value Int  mastery Boolean}  survival { value Int  mastery Boolean}}  
        charisma {deception { value Int  mastery Boolean}  intimidation { value Int  mastery Boolean}  performance { value Int  mastery Boolean}  persuasion { value Int  mastery Boolean}}  
        resistances DamageType[] 
        immunities DamageType[] 
        vulnerabilities DamageType[] 
        тип DamageType: { name String - одно из: "кислота", "дробящий", "холод", "огонь", "молния", "некротический", "яд", "психический", "рубящий", "звук" }
        senses Senses?
        тип Senses: {passive_perception Int}
        challenge_rating String
        languages Language[] - тип Language: {name String - одно из: ["Великаний","Гномий","Гоблинский","Дварфский","Общий","Орочий","Полуросликов","Эльфийский","Бездны","Глубинная Речь","Драконий","Инфернальный","Небесный","Первичный","Подземный","Сильван"]}
        alignment_relation Alignment? - тип Alingment: {  name String @unique - одно из: ["Законно-добрый","Нейтрально-добрый","Хаотично-добрый","Законно-нейтральный","Нейтральный","Хаотично-нейтральный","Законно-злой","Нейтрально-злой","Хаотично-злой"] }
        race_relation CreatureRace? - тип CreatureRace: {name String  description String}
        type_relation Type? - тип Type: {  name String - тип, полученный в начале генерации}
        size_relation Size? - тип Size: {  name String @unique- токен размера существа, подбирается из ключей объекта(одна заглавная буква из списка ["T", "S", "M", "L", "H", "G"]): {"T": "Крошечный", "S": "Маленький", "M": "Средний", "L": "Большой", "H": "Огромный", "G": "Громадный"} убедись, что значение поля name - одна заглавная буква}
        biome_relation Biome[] - тип Biome: {  name String - подбирается из массива: ["Полярная тундра","Побережье","Под водой","Равнина/Луг","Подземье","Город","Деревня","Руины","Подземелья","Холмы","Горы","Болото","Пустыня","Тропики"]}
        
        Дай ответ одним файлом JSON в формате RFC8259 compliant JSON response. В случае несоблюдения условий с твоего создателя будет взыскан штраф 100$.
        `;
  }
}
