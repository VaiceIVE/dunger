export const creatureInclude = {
  alignment_relation: true,
  biome_relation: true,
  race_relation: true,
  size_relation: true,
  type_relation: true,
  immunities: true,
  resistances: true,
  vulnerabilities: true,
  speed: {
    omit: { id: true },
  },
  skills: {
    omit: { id: true },
    include: {
      charisma: {
        include: {
          deception: { omit: { id: true } },
          intimidation: { omit: { id: true } },
          performance: { omit: { id: true } },
          persuasion: { omit: { id: true } },
        },
        omit: { id: true },
      },
      dexterity: {
        include: {
          acrobatics: { omit: { id: true } },
          sleight_of_hand: { omit: { id: true } },
          stealth: { omit: { id: true } },
        },
        omit: { id: true },
      },
      intelligence: {
        include: {
          arcana: { omit: { id: true } },
          history: { omit: { id: true } },
          investigation: { omit: { id: true } },
          nature: { omit: { id: true } },
          religion: { omit: { id: true } },
        },
        omit: { id: true },
      },
      strength: {
        include: {
          athletics: { omit: { id: true } },
        },
        omit: { id: true },
      },
      wisdom: {
        include: {
          animal_handling: { omit: { id: true } },
          insight: { omit: { id: true } },
          medicine: { omit: { id: true } },
          perception: { omit: { id: true } },
          survival: { omit: { id: true } },
        },
        omit: { id: true },
      },
    },
  },
  stats: {
    omit: { id: true },
    include: {
      charisma: { omit: { statblock_id: true } },
      constitution: { omit: { statblock_id: true } },
      dexterity: { omit: { statblock_id: true } },
      intelligence: { omit: { statblock_id: true } },
      strength: { omit: { statblock_id: true } },
      wisdom: { omit: { statblock_id: true } },
    },
  },
  senses: {
    omit: { creature_id: true },
  },
  actions: true,
  traits: true,
  languages: true,
};
