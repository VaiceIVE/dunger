export const creatureInclude = {
  alignment_relation: true,
  biomes_relation: {
    omit: {
      short_name: true,
    },
  },
  gpt_request_relation: {
    omit: { id: true, creature_id: true, created_at: true },
  },
  race_relation: true,
  size_relation: true,
  type_relation: true,
  immunities: true,
  resistances: true,
  vulnerabilities: true,
  speed: {
    omit: { id: true },
  },
  senses: {
    omit: { creature_id: true, id: true },
  },
  actions_relation: {
    omit: {
      is_template: true,
    },
  },
  traits_relation: {
    omit: {
      is_template: true,
    },
  },
  languages_relation: true,
  id: true,
  name: true,
  armor_class: true,
  hit_points: true,
  challenge_rating: true,
  description: true,
  stats: {
    select: {
      stats: true,
    },
  },
  skills: {
    select: {
      skills: true,
    },
  },
};
