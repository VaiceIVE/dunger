import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Modal,
  Stack,
  Flex,
  IconButton,
  MinusIcon,
  PlusIcon,
  Button,
  ButtonVariant,
  ButtonWidth,
  text,
  Chips,
  TrashXIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiSpeedStat } from 'store/_types/ApiSpeedStat';

const speeds: { id: keyof ApiSpeedStat; name: string }[] = [
  { id: 'walk', name: 'Хождения' },
  { id: 'fly', name: 'Полета' },
  { id: 'swim', name: 'Плавания' },
  { id: 'climb', name: 'Лазания' }
];

interface SpeedInputProps {
  speed: ApiSpeedStat;
  handleFieldChange: (value: unknown, name: string) => void;
}

export const SpeedInput = ({ speed, handleFieldChange }: SpeedInputProps) => {
  const [currentSpeedType, setCurrentSpeedType] = useState<keyof ApiSpeedStat | null>(null);

  const [tempSpeed, setTempSpeed] = useState(0);

  const handleSpeedOptionClick = (type: keyof ApiSpeedStat) => {
    setCurrentSpeedType(type);
    setTempSpeed(speed[type] ?? 0);
  };

  const handleRemoveSpeed = (type: keyof ApiSpeedStat) => {
    const updatedSpeed = { ...speed, [type]: null };
    handleFieldChange(updatedSpeed, 'speed');
  };

  const handleUpdateTempSpeed = (speed: number) => {
    setTempSpeed((prev) => (prev + speed < 0 ? 0 : prev + speed > 50 ? 50 : prev + speed));
  };

  const handleSpeedAdd = () => {
    if (!currentSpeedType) return;

    const updatedSpeed = { ...speed, [currentSpeedType]: tempSpeed };
    handleFieldChange(updatedSpeed, 'speed');
    setCurrentSpeedType(null);
  };

  return (
    <Fragment>
      <Modal
        open={!!currentSpeedType}
        onOpenChange={(open) => {
          if (!open) setCurrentSpeedType(null);
        }}>
        <Modal.Content>
          <Stack style={styles.modal} gap={24}>
            <Stack gap={16}>
              <div {...stylex.props(text.subheaderSemibold)}>
                Скорость: {speeds.find((s) => s.id === currentSpeedType)?.name}
              </div>
              <p {...stylex.props(text.defaultMedium, styles.modalDescription)}>Укажите подходящее значение скорости</p>
            </Stack>
            <Flex gap={12}>
              <IconButton
                onClick={() => {
                  handleUpdateTempSpeed(-5);
                }}
                size="lg">
                <MinusIcon />
              </IconButton>
              {!!currentSpeedType && <div {...stylex.props(styles.modalValue, text.defaultMedium)}>{tempSpeed} фт</div>}
              <IconButton
                onClick={() => {
                  handleUpdateTempSpeed(5);
                }}
                size="lg">
                <PlusIcon />
              </IconButton>
            </Flex>
            <Button onClick={handleSpeedAdd} variant={ButtonVariant.accent} width={ButtonWidth.full}>
              Добавить
            </Button>
          </Stack>
        </Modal.Content>
      </Modal>
      <Chips.Group label="Скорость">
        {speeds.map((s) => (
          <Chips
            key={s.id}
            value={s.id}
            aria-selected={!!speed[s.id]}
            onClick={() => {
              handleSpeedOptionClick(s.id);
            }}>
            <input type="hidden" name={s.id} value={speed[s.id] ?? ''} />
            {s.name} {speed[s.id] ? `- ${speed[s.id]?.toString() ?? '0'} фт.` : null}
            {speed[s.id] ? (
              <TrashXIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSpeed(s.id);
                }}
                {...stylex.props(styles.icon)}
              />
            ) : (
              <PlusIcon {...stylex.props(styles.icon, styles.plus)} />
            )}
          </Chips>
        ))}
      </Chips.Group>
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
  },
  icon: {
    height: 16,
    width: 16
  },
  plus: {
    color: colors.textTertiaryDefault
  }
});
