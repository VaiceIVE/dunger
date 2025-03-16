import { Fragment } from 'react';
import { Chips, SearchIcon, Select, Textarea, TextInput } from '@dunger/ui';

export const CommonSection = () => {
  return (
    <Fragment>
      <TextInput label="Название существа" placeholder="Например, “Хобгоблин-вожак”" />
      <Textarea
        label="Описание"
        placeholder={`Будучи Лордом Протектором Трибара и тайным агентом Арфистов, Даратра дала клятву защищать город.`}
        minRows={8}
        maxRows={12}
        autosize
      />
      <Select placeholder="-Не выбрано-" label="Мировоззрение" />
      <Select placeholder="-Не выбрано-" label="Тип" />
      <Chips.Group label="Размер"></Chips.Group>
      <Chips.Group label="Скорость"></Chips.Group>
      <Select leftSection={<SearchIcon />} placeholder="Начните вводить" label="Языки владения" />
      <Select leftSection={<SearchIcon />} placeholder="Начните вводить" label="Места обитания" />
      <Chips.Group label="Чувства"></Chips.Group>
    </Fragment>
  );
};
