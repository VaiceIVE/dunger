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
  Stack,
  text,
  TrashXIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiSenses } from 'store/_types';

const senseTypes: { id: keyof ApiSenses; name: string }[] = [
  { id: 'passive_perception', name: 'Пассивная внимательность' }
];

interface SensesInputProp {
  senses: ApiSenses;
  handleFieldChange: (value: unknown, name: string) => void;
}

export const SensesInput = ({ senses, handleFieldChange }: SensesInputProp) => {
  const [currentSenseType, setCurrentSenseType] = useState<keyof ApiSenses | null>(null);

  const [tempSense, setTempSense] = useState(0);

  const handleSenseOptionClick = (type: keyof ApiSenses) => {
    setCurrentSenseType(type);
    setTempSense(senses[type] ?? 0);
  };

  const handleRemoveSense = (type: keyof ApiSenses) => {
    const updatedSpeed = { ...senses, [type]: null };
    handleFieldChange(updatedSpeed, 'senses');
  };

  const handleUpdateTempSpeed = (sense: number) => {
    setTempSense((prev) => (prev + sense < 0 ? 0 : prev + sense > 50 ? 50 : prev + sense));
  };

  const handleSenseAdd = () => {
    if (!currentSenseType) return;

    const updatedSpeed = { ...senses, [currentSenseType]: tempSense };
    handleFieldChange(updatedSpeed, 'senses');
    setCurrentSenseType(null);
  };

  return (
    <Fragment>
      <Modal
        open={!!currentSenseType}
        onOpenChange={(open) => {
          if (!open) setCurrentSenseType(null);
        }}>
        <Modal.Content>
          <Stack style={styles.modal} gap={24}>
            <Stack gap={16}>
              <div {...stylex.props(text.subheaderSemibold)}>
                Чувство: {senseTypes.find((s) => s.id === currentSenseType)?.name}
              </div>
              <p {...stylex.props(text.defaultMedium, styles.modalDescription)}>Укажите подходящее значение чувства</p>
            </Stack>
            <Flex gap={12}>
              <IconButton
                onClick={() => {
                  handleUpdateTempSpeed(-5);
                }}
                size="lg">
                <MinusIcon />
              </IconButton>
              {!!currentSenseType && <div {...stylex.props(styles.modalValue, text.defaultMedium)}>{tempSense}</div>}
              <IconButton
                onClick={() => {
                  handleUpdateTempSpeed(5);
                }}
                size="lg">
                <PlusIcon />
              </IconButton>
            </Flex>
            <Button onClick={handleSenseAdd} variant={ButtonVariant.accent} width={ButtonWidth.full}>
              Добавить
            </Button>
          </Stack>
        </Modal.Content>
      </Modal>
      <Chips.Group label="Чувства">
        {senseTypes.map((s) => (
          <Chips
            key={s.id}
            value={s.id}
            aria-selected={!!senses[s.id]}
            onClick={() => {
              handleSenseOptionClick(s.id);
            }}>
            <input type="hidden" name={s.id} value={senses[s.id] ?? ''} />
            {s.name} {senses[s.id] ? `- ${senses[s.id]?.toString() ?? '0'}` : null}
            {senses[s.id] ? (
              <TrashXIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveSense(s.id);
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
