export enum BeastSize {
  Tiny = 'Tiny',
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
  Huge = 'Huge',
  Gargantuan = 'Gargantuan'
}

export enum BeastType {
  Beast = 'Beast',
  Dragon = 'Dragon',
  Undead = 'Undead',
  Fiend = 'Fiend',
  Fey = 'Fey',
  Construct = 'Construct',
  Elemental = 'Elemental',
  Monstrosity = 'Monstrosity',
  Celestial = 'Celestial',
  Aberration = 'Aberration',
  Ooze = 'Ooze',
  Plant = 'Plant',
  Humanoid = 'Humanoid'
}

export enum Alignment {
  LawfulGood = 'Lawful Good',
  NeutralGood = 'Neutral Good',
  ChaoticGood = 'Chaotic Good',
  LawfulNeutral = 'Lawful Neutral',
  TrueNeutral = 'True Neutral',
  ChaoticNeutral = 'Chaotic Neutral',
  LawfulEvil = 'Lawful Evil',
  NeutralEvil = 'Neutral Evil',
  ChaoticEvil = 'Chaotic Evil'
}

export enum Biom {
  Forest = 'Forest',
  Mountain = 'Mountain',
  Desert = 'Desert',
  Swamp = 'Swamp',
  Plains = 'Plains',
  Underground = 'Underground',
  Arctic = 'Arctic',
  Ocean = 'Ocean',
  Urban = 'Urban'
}

export enum DamageType {
  Acid = 'Acid',
  Bludgeoning = 'Bludgeoning',
  Cold = 'Cold',
  Fire = 'Fire',
  Force = 'Force',
  Lightning = 'Lightning',
  Necrotic = 'Necrotic',
  Piercing = 'Piercing',
  Poison = 'Poison',
  Psychic = 'Psychic',
  Radiant = 'Radiant',
  Slashing = 'Slashing',
  Thunder = 'Thunder'
}

export interface Speed {
  walk?: number;
  fly?: number;
  swim?: number;
  burrow?: number;
  climb?: number;
}

export interface Senses {
  darkvision?: number;
  tremorsense?: number;
  blindsight?: number;
  truesight?: number;
}

export interface Action {
  name: string;
  description: string;
  damage?: { amount: number; type: DamageType }; // тут наверное так не прокатит, но мб
}

export interface Trait {
  name: string;
  description: string;
  damage?: { amount: number; type: DamageType }; // тут наверное так не прокатит, но мб
}

export interface Stats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Beast {
  id: string; // Уникальный идентификатор
  name: string; // Имя существа
  imageUrl?: string; // Ссылка на изображение, мб id из которого url строится
  description: string; // Описание
  size: BeastSize; // Размер
  type: BeastType; // Тип существа
  source: string; // Источник (например, книга, пользователь, приключение), enum?
  alignment: Alignment; // Мировоззрение
  armorClass: number; // Класс брони
  hitPoints: number; // Очки здоровья
  speed: Speed; // Скорости передвижения
  stats: Stats; // Характеристики
  skills?: Record<string, number>; // Навыки (например, { stealth: 5, perception: 8 }) тут точно надо из типов
  passivePerception: number; // Пассивное восприятие
  senses?: Senses; // Чувства (например, тёмное зрение, чувствительность к вибрациям)
  resistances?: DamageType[]; // Сопротивления урону
  immunities?: DamageType[]; // Иммунитет к урону
  vulnerabilities?: DamageType[]; // Уязвимости к урону
  proficiencies?: string[]; // Навыки, тут точно надо из типов
  languages?: string[]; // Языки, которыми владеет существо, {id, name}
  challengeRating: number; // Класс сложности
  biom: Biom[]; // Биомы обитания
  actions?: Action[]; // Действия существа
  traits?: Trait[]; // Особенности существа
}

export interface ApiDirectory {
  id: string;
  name: string;
}
