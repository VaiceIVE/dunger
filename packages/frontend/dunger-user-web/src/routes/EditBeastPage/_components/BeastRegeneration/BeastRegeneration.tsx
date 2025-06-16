import { FormEventHandler, useMemo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Sheet,
  Button,
  ButtonVariant,
  PencilIcon,
  headers,
  IconButton,
  IconButtonVariant,
  XIcon,
  Stack,
  ButtonWidth,
  Textarea,
  Chips,
  Select,
  Flex,
  TextInput,
  Spinner
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { LoadingOverlay } from 'features/LoadingOverlay';
import { ApiCreatureAiInput, ApiCreatureRole } from 'store/_types';
import { queryClient } from 'store/queryClient';
import { useBeastRegenerationAction } from '../../useBeastRegenerationAction';
import { useDirectoryOptions } from '../../useDirectoryOptions';

interface BeastRegenerationProps {
  id: string;

  generation_info: ApiCreatureAiInput;
}

export const BeastRegeneration = ({ id, generation_info }: BeastRegenerationProps) => {
  const [typeId, setTypeId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { typeOptions, crOptions } = useDirectoryOptions();

  const selectedType = useMemo(() => typeOptions.find((t) => t.value === typeId), [typeOptions, typeId]);

  const { action, loading } = useBeastRegenerationAction({
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['creatures', { id }] });
      setOpen(false);
    }
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData(e.currentTarget);

    void action(formData);
  };

  return (
    <Sheet onOpenChange={setOpen} open={open} closeOnClickOutside={!loading}>
      <Sheet.Trigger asChild>
        <Button type="button" variant={ButtonVariant.secondary}>
          Изменить запрос <PencilIcon {...stylex.props(styles.pencil)} />
        </Button>
      </Sheet.Trigger>

      <Sheet.Content>
        <Sheet.Header>
          <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Запрос по генерации существа</h3>
          <Sheet.Close asChild>
            <IconButton disabled={loading} size="sm" variant={IconButtonVariant.ghost}>
              <XIcon />
            </IconButton>
          </Sheet.Close>
        </Sheet.Header>
        <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
          <div {...stylex.props(styles.body)}>
            <Stack gap={24}>
              <TextInput
                name="name"
                label="Название существа"
                defaultValue={generation_info.name}
                placeholder="Например, “Хобгоблин-вожак”"
                required
              />
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="type_name" value={selectedType?.label ?? generation_info.type_name} />
              <Flex align="flex-start" gap={16}>
                <Select
                  defaultValue={typeOptions.find((t) => t.label === generation_info.type_name)?.value ?? ''}
                  onChange={(e) => {
                    setTypeId(e);
                  }}
                  options={typeOptions}
                  name="type"
                  label="Тип"
                  placeholder="- Не выбрано -"
                  required
                />
                <Select
                  options={crOptions}
                  name="challenge_rating"
                  label="Класс Опасности (CR)"
                  placeholder="- Не выбрано -"
                  required
                  defaultValue={generation_info.challenge_rating}
                />
              </Flex>
              <Chips.Group defaultValue={generation_info.role ?? 'BALANCE'} name="role" label="Роль в бою">
                <Chips value={ApiCreatureRole.OFFENCE}>Уклон в атаку</Chips>
                <Chips value={ApiCreatureRole.DEFENCE}>Уклон в защиту</Chips>
                <Chips value="BALANCE">Сбалансированный</Chips>
              </Chips.Group>
              <Textarea
                label="Пожелания по генерации существа"
                placeholder="Опишите способности, мировоззрение и другие детали, которые характеризуют существо. Например: “стреляет ледяной паутиной”"
                name="creation_description"
                autosize
                minRows={3}
                defaultValue={generation_info.creation_description ?? ''}
                maxRows={8}
                maxLength={300}
              />
            </Stack>
          </div>

          <Sheet.Footer style={styles.footer}>
            <Button disabled={loading} type="submit" width={ButtonWidth.full}>
              Генерировать снова
            </Button>
          </Sheet.Footer>
        </form>

        <LoadingOverlay loading={loading}>
          <Spinner />
        </LoadingOverlay>
      </Sheet.Content>
    </Sheet>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault,
    height: '100%',
    overflowY: 'scroll',
    scrollbarGutter: 'stable',
    '::-webkit-scrollbar': {
      background: 'transparent',
      display: 'none',
      height: 0,
      width: 0
    }
  },
  pencil: {
    color: colors.textTertiaryDefault,
    height: 16,
    width: 16
  },
  title: {
    flex: '1'
  },
  form: {
    flex: '1',

    display: 'flex',
    flexDirection: 'column',
    gap: 0
  },
  body: {
    flex: '1',
    padding: '0 24px 24px'
  },
  footer: {
    display: 'flex',
    gap: 8
  }
});
