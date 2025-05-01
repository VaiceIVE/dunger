import { FormEventHandler, Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useInfiniteQuery } from '@tanstack/react-query';
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
import { ApiDirectory, ApiPaginatedResult } from 'store/_types/_common';
import { ApiCreatureRole } from 'store/_types/ApiCreatureAiInput';
import { useDebouncedValue } from 'utils/_hooks/useDebouncedValue';
import { CreateMode } from '../../NewBeastPage.types';
import { useDirectoryOptions } from '../../useDirectoryOptions';

interface NewBeastFormProps {
  mode: CreateMode;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

export const NewBeastForm = ({ mode, handleSubmit }: NewBeastFormProps) => {
  const authFetch = useAuthFetch();

  const [templateQuery, setTemplateQuery] = useState('');
  const debouncedQuery = useDebouncedValue(templateQuery);

  const {
    data: templates,
    fetchNextPage: fetchMoreTemplates,
    hasNextPage: hasMoreTemplates
  } = useInfiniteQuery({
    queryKey: ['creatures', { query: debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam.toString() });

      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }

      return authFetch<{ results: ApiDirectory[] } & ApiPaginatedResult>(`/creatures/templates?${params.toString()}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    }
  });

  const { typeOptions, crOptions } = useDirectoryOptions();
  const templateOptions =
    templates?.pages.flatMap((p) => p.results).map((t) => ({ value: t.id.toString(), label: t.name })) ?? [];

  return (
    <form key={mode} onSubmit={handleSubmit} {...stylex.props(styles.root)}>
      <Stack gap={24}>
        <ModeBanner mode={mode} />

        <TextInput name="name" label="Название существа" placeholder="Например, “Хобгоблин-вожак”" required />
        {mode === CreateMode.generation ? (
          <Fragment>
            <Flex align="flex-start" gap={16}>
              <Select options={typeOptions} name="type" label="Тип" placeholder="- Не выбрано -" required />
              <Select
                options={crOptions}
                name="challenge_rating"
                label="Класс Опасности (CR)"
                placeholder="- Не выбрано -"
                required
              />
            </Flex>
            <Chips.Group name="role" label="Роль в бою">
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
              maxRows={8}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Select
              options={crOptions}
              name="challenge_rating"
              label="Класс Опасности (CR)"
              placeholder="- Не выбрано -"
              required
            />
            <Select
              options={templateOptions}
              hasMore={hasMoreTemplates}
              next={fetchMoreTemplates}
              label="Шаблон заполнения"
              name="template_id"
              placeholder="Начните вводить"
              searchable
              searchValue={templateQuery}
              onSearchChange={setTemplateQuery}
            />
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
  buttonIcon: { color: colors.blue60, height: 14, width: 14 },
  description: { color: colors.textSecondaryDefault },
  titleIcon: { color: colors.blue60 }
});
