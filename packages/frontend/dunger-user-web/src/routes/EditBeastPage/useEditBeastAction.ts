import { useMutation } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ApiCreature, ApiCreatureInput, ApiSkillsInput, ApiSpeedStat, ApiStatsInput } from 'store/_types';
import { getAbilityModifier } from 'utils/getAbilityModifier';

const SKILL_TO_ABILITY: Record<string, keyof ApiSkillsInput> = {
  athletics: 'strength',
  acrobatics: 'dexterity',
  sleight_of_hand: 'dexterity',
  stealth: 'dexterity',
  arcana: 'intelligence',
  history: 'intelligence',
  investigation: 'intelligence',
  nature: 'intelligence',
  religion: 'intelligence',
  animal_handling: 'wisdom',
  insight: 'wisdom',
  medicine: 'wisdom',
  perception: 'wisdom',
  survival: 'wisdom',
  deception: 'charisma',
  intimidation: 'charisma',
  performance: 'charisma',
  persuasion: 'charisma'
};

const getSkills = (formData: FormData, stats: ApiStatsInput) => {
  const skills: Record<keyof ApiSkillsInput, object> = {
    strength: {},
    dexterity: {},
    intelligence: {},
    wisdom: {},
    charisma: {}
  };

  Object.entries(SKILL_TO_ABILITY).forEach(([skill, ability]) => {
    const mod = getAbilityModifier(stats[ability].value);

    const mastery = (formData.get(`${skill}_mastery`) as string).toString() === 'true';

    skills[ability] = {
      ...skills[ability],
      [skill]: {
        value: mod + (mastery ? 2 : 0),
        mastery
      }
    };
  });

  return skills as ApiSkillsInput;
};

export const useEditBeastAction = () => {
  const authFetch = useAuthFetch();

  const { mutateAsync: updateCreature } = useMutation<ApiCreature, Error, ApiCreatureInput>({
    mutationFn: (input) =>
      authFetch(`/creatures/${input.id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  });

  const saveAction = async (formData: FormData) => {
    const id = (formData.get('id') as string).toString();
    // Общая информация
    const name = (formData.get('name') as string).toString();
    const description = (formData.get('description') as string).toString();
    const type_id = (formData.get('type_id') as string).toString();
    const alignment_id = (formData.get('alignment_id') as string).toString();
    const size_id = (formData.get('size_id') as string).toString();

    const walk = (formData.get('walk') as string).toString();
    const fly = (formData.get('fly') as string).toString();
    const swim = (formData.get('swim') as string).toString();
    const climb = (formData.get('climb') as string).toString();

    const languages_ids = (formData.get('languages_ids') as string).toString();
    const biomes_ids = (formData.get('biomes_ids') as string).toString();
    const passive_perception = (formData.get('passive_perception') as string).toString();

    // Статблок
    const hit_points = (formData.get('hit_points') as string).toString();
    const challenge_rating = (formData.get('challenge_rating') as string).toString();

    const strength = (formData.get('strength') as string).toString();
    const dexterity = (formData.get('dexterity') as string).toString();
    const constitution = (formData.get('constitution') as string).toString();
    const intelligence = (formData.get('intelligence') as string).toString();
    const wisdom = (formData.get('wisdom') as string).toString();
    const charisma = (formData.get('charisma') as string).toString();
    const strength_mastery = (formData.get('strength_mastery') as string).toString();
    const dexterity_mastery = (formData.get('dexterity_mastery') as string).toString();
    const constitution_mastery = (formData.get('constitution_mastery') as string).toString();
    const intelligence_mastery = (formData.get('intelligence_mastery') as string).toString();
    const wisdom_mastery = (formData.get('wisdom_mastery') as string).toString();
    const charisma_mastery = (formData.get('charisma_mastery') as string).toString();

    const resistances_ids = (formData.get('resistances_ids') as string).toString();
    const immunities_ids = (formData.get('immunities_ids') as string).toString();
    const vulnerabilities_ids = (formData.get('vulnerabilities_ids') as string).toString();
    // Действия
    const actions_ids = (formData.get('actions_ids') as string).toString();
    // Способности и свойства
    const traits_ids = (formData.get('traits_ids') as string).toString();

    const speed: ApiSpeedStat = {
      walk: walk === '' ? null : +walk,
      fly: fly === '' ? null : +fly,
      swim: swim === '' ? null : +swim,
      climb: climb === '' ? null : +climb
    };

    const stats: ApiStatsInput = {
      strength: {
        value: strength ? +strength : 0,
        mastery: strength_mastery === 'true'
      },
      dexterity: {
        value: dexterity ? +dexterity : 0,
        mastery: dexterity_mastery === 'true'
      },
      constitution: {
        value: constitution ? +constitution : 0,
        mastery: constitution_mastery === 'true'
      },
      intelligence: {
        value: intelligence ? +intelligence : 0,
        mastery: intelligence_mastery === 'true'
      },
      wisdom: {
        value: wisdom ? +wisdom : 0,
        mastery: wisdom_mastery === 'true'
      },
      charisma: {
        value: charisma ? +charisma : 0,
        mastery: charisma_mastery === 'true'
      }
    };

    const skills = getSkills(formData, stats);

    const input: ApiCreatureInput = {
      id,
      name,
      description,
      type_id: type_id ? +type_id : null,
      alignment_id: alignment_id === '' ? null : +alignment_id,
      size_id: size_id === '' ? null : size_id,
      speed,
      languages_ids: languages_ids ? languages_ids.split(',').map(Number) : [],
      biomes_ids: biomes_ids ? biomes_ids.split(',').map(Number) : [],
      senses: {
        passive_perception: passive_perception === '' ? null : +passive_perception
      },
      hit_points: hit_points === '' ? 1 : +hit_points,
      challenge_rating,
      stats,
      armor_type_id: null,
      skills: skills,
      resistances_ids: resistances_ids ? resistances_ids.split(',') : [],
      immunities_ids: immunities_ids ? immunities_ids.split(',') : [],
      vulnerabilities_ids: vulnerabilities_ids ? vulnerabilities_ids.split(',') : [],
      actions_ids: actions_ids ? actions_ids.split(',').map(Number) : [],
      traits_ids: traits_ids ? traits_ids.split(',').map(Number) : []
    };

    await updateCreature(input);
  };

  return {
    saveAction
  };
};
