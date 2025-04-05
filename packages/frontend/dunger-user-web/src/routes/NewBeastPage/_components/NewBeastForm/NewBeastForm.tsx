import { FormEventHandler, Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  Stack,
  TextInput,
  Flex,
  Select,
  Chips,
  Textarea,
  Button,
  ButtonVariant,
  ButtonWidth,
  AiFillIcon,
  text
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Banner } from 'components/Banner';
import { ApiDirectory } from 'store/apiTypes.gen';
import { CreateMode } from '../../NewBeastPage.types';

interface NewBeastFormProps {
  mode: CreateMode;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const NewBeastForm = ({ mode, handleSubmit }: NewBeastFormProps) => {
  const authFetch = useAuthFetch();
  const { data: types } = useSuspenseQuery<ApiDirectory[]>({
    queryKey: ['creatures', 'types'],
    queryFn: () => authFetch(`/creatures/types`)
  });

  const { data } = useSuspenseQuery({
    queryKey: ['creatures', 'templates'],
    queryFn: () => authFetch(`/creatures/templates?offset=0`)
  });

  const typeOptions = types.map((c) => {
    return {
      value: c.id.toString(),
      label: c.name
    };
  });

  return (
    <form key={mode} onSubmit={handleSubmit} {...stylex.props(styles.root)}>
      <Stack gap={24}>
        <ModeBanner mode={mode} />

        <TextInput name="name" label="Название существа" placeholder="Например, “Хобгоблин-вожак”" required />
        {mode === CreateMode.generation ? (
          <Fragment>
            <Flex align="flex-start" gap={16}>
              <Select options={typeOptions} name="beastTypeId" label="Тип" placeholder="-Не выбрано-" required />
              <Select name="challengeRating" label="Класс Опасности (CR)" placeholder="-Не выбрано-" required />
            </Flex>
            <Chips.Group name="type" label="Роль в бою">
              <Chips value="damage">Уклон в атаку</Chips>
              <Chips value="defense">Уклон в защиту</Chips>
              <Chips value="balanse">Сбалансированный</Chips>
            </Chips.Group>
            <Textarea
              label="Пожелания по генерации существа"
              placeholder="Опишите способности, мировоззрение и другие детали, которые характеризуют существо. Например: “стреляет ледяной паутиной”"
              autosize
              minRows={3}
              maxRows={8}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Select name="challengeRating" label="Класс Опасности (CR)" placeholder="-Не выбрано-" required />
            <Select label="Шаблон заполнения" name="templateId" placeholder="Начните вводить" searchable />
          </Fragment>
        )}
      </Stack>

      {mode === CreateMode.generation ? (
        <Button value={CreateMode.generation} variant={ButtonVariant.tertiarySecondary} width={ButtonWidth.full}>
          Генерировать статблок{' '}
          <div {...stylex.props(styles.buttonIconWrapper)}>
            <AiFillIcon {...stylex.props(styles.buttonIcon)} />
          </div>
        </Button>
      ) : (
        <Button value={CreateMode.manual} width={ButtonWidth.full}>
          Продолжить заполнение
        </Button>
      )}
    </form>
  );
};

const ModeBanner = ({ mode }: { mode: CreateMode }) => (
  <Banner color="blue">
    <Banner.Title>
      <Flex gap={8}>
        <AiFillIcon {...stylex.props(styles.titleIcon)} />
        {mode === CreateMode.generation ? 'Режим генерации статблока' : 'Режим ручного заполнения статблока'}
      </Flex>
    </Banner.Title>
    <div {...stylex.props(styles.description, text.defaultMedium)}>
      {mode === CreateMode.generation ? (
        <Fragment>
          Заполните минимальные поля, чтобы мы смогли автоматически подставить значения.
          <span {...stylex.props(text.defaultSemibold)}> Вы сможете отредактировать статблок после генерации.</span>
        </Fragment>
      ) : (
        'Заполните начальные поля, чтобы перейти к следующему шагу'
      )}
    </div>
  </Banner>
);

const styles = stylex.create({
  root: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    padding: 24
  },
  buttonIconWrapper: {
    alignItems: 'center',
    backgroundColor: colors.backgroundBlueDefault,
    borderRadius: '50%',
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    width: 30
  },
  buttonIcon: {
    color: colors.blue60,
    height: 14,
    width: 14
  },
  description: {
    color: colors.textSecondaryDefault
  },
  titleIcon: {
    color: colors.blue60
  }
});
