import { ApiSkills } from 'src/common/dto';

export const nullSkillsObject: ApiSkills = {
  strength: {
    athletics: {
      value: null,
      mastery: false,
      name: 'Атлетика',
    },
  },
  dexterity: {
    acrobatics: {
      value: null,
      mastery: false,
      name: 'Акробатика',
    },
    sleight_of_hand: {
      value: null,
      mastery: false,
      name: 'Ловкость рук',
    },
    stealth: {
      value: null,
      mastery: false,
      name: 'Скрытность',
    },
  },
  intelligence: {
    arcana: {
      value: null,
      mastery: false,
      name: 'Магия',
    },
    history: {
      value: null,
      mastery: false,
      name: 'История',
    },
    investigation: {
      value: null,
      mastery: false,
      name: 'Расследование',
    },
    nature: {
      value: null,
      mastery: false,
      name: 'Природа',
    },
    religion: {
      value: null,
      mastery: false,
      name: 'Религия',
    },
  },
  wisdom: {
    animal_handling: {
      value: null,
      mastery: false,
      name: 'Уход за животными',
    },
    insight: {
      value: null,
      mastery: false,
      name: 'Проницательность',
    },
    medicine: {
      value: null,
      mastery: false,
      name: 'Медицина',
    },
    perception: {
      value: null,
      mastery: false,
      name: 'Внимательность',
    },
    survival: {
      value: null,
      mastery: false,
      name: 'Выживание',
    },
  },
  charisma: {
    deception: {
      value: null,
      mastery: false,
      name: 'Обман',
    },
    intimidation: {
      value: null,
      mastery: false,
      name: 'Запугивание',
    },
    performance: {
      value: null,
      mastery: false,
      name: 'Выступление',
    },
    persuasion: {
      value: null,
      mastery: false,
      name: 'Убеждение',
    },
  },
};
