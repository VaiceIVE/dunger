import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptService {

    getCreaturePrompt(name: string, challenge_rating: string, type: string, creation_description?: string, role?: 'OFFENCE' | 'DEFENCE'){
        return `Ты выступаешь в роли генератора-помошника для создания существ для настольной ролевой игры Подземелья и драконы. 
        Твоя задача - составить существо на основе следующих изначальных характеристик: 
        имя - ${name}, 
        класс опасности - ${challenge_rating}, 
        тип существа - ${type}, 
        ${creation_description ?? 'описание существа: ' + creation_description}, 
        роль существа в бою: ${role ? role : 'обычный рядовой противник'}
        Необходимый формат данных в котором нужно предоставить данные о существе:
        name String
        description String? - создай новое поле для описания существа
        speed Speed_stat? - тип Speed_stat: walk Int?  fly Int?  swim Int?  burrow Int?  climb Int?, некоторые поля тут могут не существовать
        armor_class Int?
        hit_points Int?
        stats Creature_stats? - тип Creature_stats: strength {value Int  mastery Boolean}   dexterity {value Int  mastery Boolean}   constitution {value Int  mastery Boolean}   intelligence {value Int  mastery Boolean}   wisdom {value Int  mastery Boolean}   charisma {value Int  mastery Boolean} 
        skills SkillsList? - 
        тип Skills_list: 
        strength {athletics {value Int  mastery Boolean}}  
        dexterity {acrobatics { value Int  mastery Boolean}  sleight_of_hand { value Int  mastery Boolean}  stealth { value Int  mastery Boolean}}  
        intelligence {arcana { value Int  mastery Boolean}  history { value Int  mastery Boolean}  investigation { value Int  mastery Boolean}  nature { value Int  mastery Boolean}  religion { value Int  mastery Boolean}}  
        wisdom {animal_handling { value Int  mastery Boolean}  insight { value Int  mastery Boolean}  medicine { value Int  mastery Boolean}  perception { value Int  mastery Boolean}  survival { value Int  mastery Boolean}}  
        charisma {deception { value Int  mastery Boolean}  intimidation { value Int  mastery Boolean}  performance { value Int  mastery Boolean}  persuasion { value Int  mastery Boolean}}  
        resistances DamageType[] 
        immunities DamageType[] 
        vulnerabilities DamageType[] 
        тип DamageType: {name String - выбирается из списка: ["Кислотный","Дробящий","Холод","Огонь","Силовой","Молния","Некротический","Колющий","Яд","Психический","Излучение","Рубящий","Звуковой"]}
        senses Senses?
        тип Senses: {passive_perception Int}
        challenge_rating String
        languages Language[] - тип Language: {name: String}
        alignment_relation Alignment? - тип Alingment: {  name String @unique - выбирается из списка: ["законно-добрый","нейтрально-добрый","хаотично-добрый","законно-нейтральный","нейтральный","хаотично-нейтральный","законно-злой","нейтрально-злой","хаотично-злой"] }
        race_relation CreatureRace? - тип CreatureRace: {name String  description String}
        type_relation Type? - тип Type: {  name String - тип, полученный в начале генерации}
        size_relation Size? - тип Size: {  name String @unique- токен размера существа, подбирается из ключей объекта(одна заглавная буква из списка ["T", "S", "M", "L", "H", "G"]): {"T": "Крошечный", "S": "Маленький", "M": "Средний", "L": "Большой", "H": "Огромный", "G": "Громадный"} убедись, что значение поля name - одна заглавная буква}
        biome_relation Biome[] - тип Biome: {  title String - подбирается из массива: ["Полярная тундра","Побережье","Под водой","Равнина/Луг","Подземье","Город","Деревня","Руины","Подземелья","Холмы","Горы","Болото","Пустыня","Тропики"]}
        
        Дай ответ одним файлом JSON в формате RFC8259 compliant JSON response. В случае несоблюдения условий с твоего создателя будет взыскан штраф 100$.
        `
    }
}
