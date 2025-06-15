import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Accordion,
  ChevronDownIcon,
  ChevronUpIcon,
  headers,
  IconButton,
  Input,
  MultiSelect,
  Radio,
  RadioGroup,
  Select,
  text,
  Textarea,
  TextInput
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiMagicItem } from 'store/_types';
import { useDirectoryOptions } from '../../useDirectoryOptions';

interface MagicItemFormProps {
  formState: ApiMagicItem & { attunement_ids: string[]; type_id: string | null; rarity_id: string | null };
  handleFieldChange: (value: unknown, name: string) => void;
}

export const MagicItemForm = ({ formState, handleFieldChange }: MagicItemFormProps) => {
  const { attunementConditionOptions, magicItemTypeOptions, magicItemRarityOptions } = useDirectoryOptions();

  return (
    <Accordion defaultValue={'common'} transitionDuration={600} multiple style={styles.root}>
      <Accordion.Item style={styles.section} value="common">
        <Accordion.Control style={[headers.h3Semibold, styles.control]}>
          {(open: boolean) => (
            <Fragment>
              1. Общие данные
              <IconButton type="button" aria-selected={open} size={'sm'}>
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </IconButton>
            </Fragment>
          )}
        </Accordion.Control>

        <Accordion.Panel>
          <div {...stylex.props(styles.panel)}>
            <TextInput
              value={formState.name}
              onChange={(e) => {
                handleFieldChange(e.target.value, 'name');
              }}
              name="name"
              required
              label="Название"
              placeholder="Меч тысячи истин"
            />
            <Select
              name="type_id"
              options={magicItemTypeOptions}
              value={formState.type_id ?? ''}
              onChange={(e) => {
                handleFieldChange(e, 'type_id');
              }}
              label="Тип предмета"
              placeholder="Выберите тип"
            />
            <Select
              name="rarity_id"
              options={magicItemRarityOptions}
              value={formState.rarity_id ?? ''}
              onChange={(e) => {
                handleFieldChange(e, 'rarity_id');
              }}
              label="Редкость предмета"
              placeholder="Выберите редкость"
            />
            <Textarea
              name="description"
              value={formState.description ?? ''}
              onChange={(e) => {
                handleFieldChange(e.target.value, 'description');
              }}
              label="Описание предмета и его эффектов"
              placeholder="Начните вводить"
              minRows={3}
              maxRows={6}
              autosize
              maxLength={400}
            />
            <Input.Wrapper required style={styles.radioGroup} label="Требуется настройка">
              <RadioGroup
                name="requires_attunement"
                onValueChange={(e) => {
                  handleFieldChange(e === 'yes' ? true : false, 'requires_attunement');

                  if (e == 'no') {
                    handleFieldChange([], 'attunements');
                    handleFieldChange([], 'attunement_ids');
                  }
                }}
                value={formState.requires_attunement ? 'yes' : 'no'}
                defaultValue={'no'}>
                <div {...stylex.props(styles.radio, text.defaultMedium)}>
                  <Radio size="sm" id="yes" value={'yes'} />
                  <label htmlFor="yes">Да</label>
                </div>
                <div {...stylex.props(styles.radio, text.defaultMedium)}>
                  <Radio size="sm" id="no" value={'no'} />
                  <label htmlFor="no">Нет</label>
                </div>
              </RadioGroup>
            </Input.Wrapper>
            <MultiSelect
              name="attunement_ids"
              disabled={!formState.requires_attunement}
              value={formState.attunement_ids}
              onChange={(ids, selectedRecords) => {
                handleFieldChange(ids, 'attunement_ids');
                handleFieldChange(selectedRecords, 'attunements');
              }}
              selectedRecords={formState.attunements}
              label="Источник настройки"
              options={attunementConditionOptions}
              placeholder="Выберите источник"
            />
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  section: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2
  },
  control: {
    padding: '18px 24px'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: '16px 24px 24px'
  },
  radioGroup: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingBlock: '16px',
    paddingInline: '20px'
  },
  radio: {
    alignItems: 'center',
    display: 'flex',
    gap: 12
  }
});
