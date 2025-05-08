export type Creature = {
  name: string;
  fiction?: string;
  size: string;
  type: string;
  source: string;
  alignment: string;
  ac: string;
  hp: string;
  speed: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  skill?: string;
  biom?: string;
  immune: string;
  vulnerable?: string;
  resist?: string;
  conditionImmune: string;
  senses: string;
  passive: string;
  languages: string;
  cr: string;
  trait: {
    name: string;
    text: string;
    attack?: string;
  }[];
  action: {
    name: string;
    text: string;
    attack?: string;
  }[];
  sType: string;
  aSubtypes: string[];
};
