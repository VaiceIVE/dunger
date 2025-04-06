export interface ApiSkills {
  strength: {
    athletics: ApiSkill;
  };
  dextedexterity: {
    acrobatics: ApiSkill;
    sleight_of_hand: ApiSkill;
    stealth: ApiSkill;
  };
  intelligence: {
    arcana: ApiSkill;
    history: ApiSkill;
    investigation: ApiSkill;
    nature: ApiSkill;
    religion: ApiSkill;
  };
  wisdom: {
    animal_handling: ApiSkill;
    insight: ApiSkill;
    medicine: ApiSkill;
    perception: ApiSkill;
    survival: ApiSkill;
  };
  charisma: {
    deception: ApiSkill;
    intimidation: ApiSkill;
    performance: ApiSkill;
    persuasion: ApiSkill;
  };
}

export interface ApiSkill {
  value: number | null;
  mastery: boolean;
  name: string;
}
