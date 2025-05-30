import { Fragment } from 'react';
import { Chips, MultiSelect, Select, Textarea, TextInput } from '@dunger/ui';
import { useDirectoryOptions } from '../../useDirectoryOptions';
import { SectionProps } from '../BeastForm/BeastForm';
import { SensesInput } from '../SensesInput';
import { SpeedInput } from '../SpeedInput';

export const CommonSection = ({ formState, handleFieldChange }: SectionProps) => {
  const { typeOptions, alignmentOptions, sizeOptions, biomeOptions, languageOptions } = useDirectoryOptions();

  return (
    <Fragment>
      <TextInput
        value={formState.name}
        onChange={(e) => {
          handleFieldChange(e.target.value, 'name');
        }}
        name="name"
        label="Название существа"
        placeholder="Например, “Хобгоблин-вожак”"
      />
      <Textarea
        value={formState.description ?? ''}
        onChange={(e) => {
          handleFieldChange(e.target.value, 'description');
        }}
        name="description"
        label="Описание"
        placeholder={`Будучи Лордом Протектором Трибара и тайным агентом Арфистов, Даратра дала клятву защищать город.`}
        minRows={8}
        maxRows={12}
        autosize
      />
      <Select
        value={formState.alignment_id?.toString()}
        onChange={(e, selectedRecord) => {
          handleFieldChange(e, 'alignment_id');
          handleFieldChange(selectedRecord?.name, 'alignment_name');
        }}
        options={alignmentOptions}
        name="alignment_id"
        placeholder="- Не выбрано -"
        label="Мировоззрение"
      />
      <Select
        value={formState.type_id?.toString()}
        onChange={(e, selectedRecord) => {
          handleFieldChange(e, 'type_id');
          handleFieldChange(selectedRecord?.name, 'type_name');
        }}
        options={typeOptions}
        name="type_id"
        placeholder="- Не выбрано -"
        label="Тип"
      />
      <Chips.Group
        name="size_id"
        value={formState.size_id ?? ''}
        onChange={(e) => {
          handleFieldChange(e, 'size_id');
          handleFieldChange(sizeOptions.find((o) => o.value == e)?.label ?? '', 'size_name');
        }}
        label="Размер">
        {sizeOptions.map((o) => (
          <Chips key={o.value} value={o.value}>
            {o.label}
          </Chips>
        ))}
      </Chips.Group>
      <SpeedInput speed={formState.speed} handleFieldChange={handleFieldChange} />
      <MultiSelect
        options={languageOptions}
        value={formState.languages_string_ids}
        onChange={(ids, selectedRecords) => {
          handleFieldChange(ids, 'languages_string_ids');
          handleFieldChange(selectedRecords, 'languages');
        }}
        selectedRecords={formState.languages}
        name="languages_ids"
        placeholder="- Не выбрано -"
        label="Языки владения"
      />
      <MultiSelect
        value={formState.biomes_string_ids}
        onChange={(ids, selectedRecords) => {
          handleFieldChange(ids, 'biomes_string_ids');
          handleFieldChange(selectedRecords, 'biomes');
        }}
        selectedRecords={formState.biomes}
        name="biomes_ids"
        options={biomeOptions}
        placeholder="- Не выбрано -"
        label="Места обитания"
      />
      <SensesInput senses={formState.senses} handleFieldChange={handleFieldChange} />
    </Fragment>
  );
};
