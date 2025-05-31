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

interface MagicItemFormProps {
  formState: ApiMagicItem;
  handleFieldChange: (value: unknown, name: string) => void;
}

export const MagicItemForm = ({ formState }: MagicItemFormProps) => {
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
            <TextInput value={formState.name} label="Название" placeholder="Меч тысячи истин" />
            <Select label="Тип предмета" placeholder="Выберите тип" />
            <Select label="Редкость предмета" placeholder="Выберите редкость" />
            <Textarea
              label="Описание предмета и его эффектов"
              placeholder="Начните вводить"
              minRows={3}
              maxRows={6}
              autosize
              maxLength={400}
            />
            <Input.Wrapper required style={styles.radioGroup} label="Требуется настройка">
              <RadioGroup defaultValue={'no'}>
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
            <MultiSelect label="Источник настройки" placeholder="Выберите источник" />
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
