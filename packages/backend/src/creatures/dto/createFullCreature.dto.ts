import { Action, Creature_stats, Damage_type, SkillsList, Speed_stat, Trait } from "@prisma/client"

export class FullCreatureDTO {
    name: string
    description: string
    speed: Omit<Speed_stat, 'id'>
    stats: Creature_stats
    hit_points: number
    armor_class: number
    challenge_rating: string
    skills?: SkillsList
    passive_perception: number
    alignment_name: string
    size_key: SizeKey
    creature_type?: CreatureType
    immunities?: Damage_type[]
    resistances?: Damage_type[]
    vunlerabilities?: Damage_type[]
    languages?: string[]
    actions?: Action[]
    traits?: Trait[]
    biome_name?: string
    creature_race?: string
}

export enum SizeKey {
    T = "T",
    S = "S",
    M = "M",
    L = "L",
    H = "H",
    G = "G"
}

export enum CreatureType {
    //Тут аберрация, исчадие, гуманоид, все такое
}

// export class SpeedObject {
//     walk?: number;
//     fly?: number;
//     swim?: number;
//     burrow?: number;
//     climb?: number;
// }

// export class StatsObject{
//     strength: number;
//     dexterity: number;
//     constitution: number;
//     intelligence: number;
//     wisdom: number;
//     charisma: number;
// }

// export class Action {
//     name: string
//     text: string
//     attack?: string
// }

// export class Trait {
//     name: string
//     text: string
//     attack?: string
// }

// export class Skills {
    // athletics?: number
    // acrobatics?: number
    // sleight_of_hand?: number
    // stealth?: number
    // arcana?: number
    // history?: number
    // investigation?: number
    // nature?: number
    // religion?: number
    // animal_handling?: number
    // insight?: number
    // medicine?: number
    // perception?: number
    // survival?: number
    // deception?: number
    // intimidation?: number
    // performance?: number
    // persuasion?: number
// }
