export interface ApiStats {
  strength: ApiStat;
  dexterity: ApiStat;
  constitution: ApiStat;
  intelligence: ApiStat;
  wisdom: ApiStat;
  charisma: ApiStat;
}

export interface ApiStat {
  value: number | null;
  mastery: boolean;
}
