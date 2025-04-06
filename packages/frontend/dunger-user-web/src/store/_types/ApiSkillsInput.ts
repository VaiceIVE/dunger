export interface ApiSkillsInput {
  strength: {
    athletics: ApiSkillInput;
  };
  dexterity: {
    acrobatics: ApiSkillInput;
    sleight_of_hand: ApiSkillInput;
    stealth: ApiSkillInput;
  };
  intelligence: {
    arcana: ApiSkillInput;
    history: ApiSkillInput;
    investigation: ApiSkillInput;
    nature: ApiSkillInput;
    religion: ApiSkillInput;
  };
  wisdom: {
    animal_handling: ApiSkillInput;
    insight: ApiSkillInput;
    medicine: ApiSkillInput;
    perception: ApiSkillInput;
    survival: ApiSkillInput;
  };
  charisma: {
    deception: ApiSkillInput;
    intimidation: ApiSkillInput;
    performance: ApiSkillInput;
    persuasion: ApiSkillInput;
  };
}

export interface ApiSkillInput {
  value: number | null;
  mastery: boolean;
}
