import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Button,
  ButtonVariant,
  ButtonWidth,
  Chips,
  Flex,
  IconButton,
  MinusIcon,
  Modal,
  PlusIcon,
  Select,
  Stack,
  text,
  Textarea,
  TextInput
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

const speeds = [
  { id: 'walk', name: 'Хождения' },
  { id: 'fly', name: 'Полета' },
  { id: 'swim', name: 'Плавания' },
  { id: 'climb', name: 'Лазания' }
];

export const CommonSection = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentSpeedType, setCurrentSpeedType] = useState<string | null>('');

  const handleSpeedOptionClick = (type: string) => {
    setCurrentSpeedType(type);
    setOpen(true);
  };

  return (
    <Fragment>
      <Modal
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) setCurrentSpeedType(null);
        }}>
        <Stack style={styles.modal} gap={24}>
          <Stack gap={16}>
            <div {...stylex.props(text.subheaderSemibold)}>
              Скорость: {speeds.find((s) => s.id === currentSpeedType)?.name}
            </div>
            <p {...stylex.props(text.defaultMedium, styles.modalDescription)}>Укажите подходящее значение скорости</p>
          </Stack>
          <Flex gap={12}>
            <IconButton size="lg">
              <MinusIcon />
            </IconButton>
            <div {...stylex.props(styles.modalValue, text.defaultMedium)}>фт</div>
            <IconButton size="lg">
              <PlusIcon />
            </IconButton>
          </Flex>
          <Button variant={ButtonVariant.accent} width={ButtonWidth.full}>
            Добавить
          </Button>
        </Stack>
      </Modal>

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
      <Chips.Group label="Скорость">
        {speeds.map((s) => (
          <Chips
            key={s.id}
            value={s.id}
            onClick={() => {
              handleSpeedOptionClick(s.id);
            }}>
            {s.name}
          </Chips>
        ))}
      </Chips.Group>
      <Select searchable placeholder="Начните вводить" label="Языки владения" />
      <Select searchable placeholder="Начните вводить" label="Места обитания" />
      <Chips.Group label="Чувства"></Chips.Group>
    </Fragment>
  );
};

const styles = stylex.create({
  modal: {
    color: colors.textPrimaryDefault,
    width: '100%'
  },
  modalDescription: {
    color: colors.textSecondaryDefault
  },
  modalValue: {
    alignItems: 'center',
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.textTertiaryDefault,
    display: 'flex',
    flex: '1',
    height: '100%',
    justifyContent: 'center',
    padding: 12
  }
});
