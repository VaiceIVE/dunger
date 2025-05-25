import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  Accordion,
  Button,
  ButtonVariant,
  ButtonWidth,
  Chips,
  Flex,
  headers,
  IconButton,
  IconButtonVariant,
  InfiniteScroll,
  PlusFilledIcon,
  SearchIcon,
  Sheet,
  Stack,
  text,
  TextInput,
  XIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiPaginatedResult, ApiAction } from 'store/_types';
import { useDebouncedValue } from 'utils/_hooks/useDebouncedValue';
import { getWordForm } from 'utils/getWordForm';
import { SectionProps } from '../BeastForm/BeastForm';
import { GroupList } from './_components/GroupList';

export const ActionsSection = ({ formState, handleFieldChange }: SectionProps) => {
  const authFetch = useAuthFetch();

  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState<Record<string, ApiAction>>(
    Object.fromEntries(formState.actions.map((action) => [action.name, action]))
  );
  const [openedSections, setOpenedSections] = useState<string[]>([]);

  const [actionQuery, setActionQuery] = useState('');
  const debouncedQuery = useDebouncedValue(actionQuery);

  const {
    data: actionGroups,
    fetchNextPage: fetchMoreActionGroups,
    hasNextPage: hasMoreActionGroups
  } = useInfiniteQuery({
    queryKey: ['creatures', 'action-groups', { query: debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam.toString() });

      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }

      return authFetch<{ results: { name: string; count: number }[] } & ApiPaginatedResult>(
        `/creatures/actions/groups?${params.toString()}`
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    }
  });

  const totalCount = actionGroups?.pages.length ? actionGroups.pages[0].pagination.totalCount : 0;
  const actionGroupOptions = actionGroups?.pages.flatMap((p) => p.results) ?? [];

  const handleSave = () => {
    const actions = Object.values(temp);
    handleFieldChange(actions, 'actions');
    setOpen(false);
  };

  const handleReset = () => {
    setTemp(Object.fromEntries(formState.actions.map((action) => [action.name, action])));
  };

  const handleChange = (actionObj: Record<string, ApiAction>) => {
    setTemp((prev) => ({ ...prev, ...actionObj }));
  };

  const handleRemove = (actionName: string) => {
    const { [actionName]: unused, ...filteredActions } = temp;
    void unused;

    setTemp(filteredActions);

    handleFieldChange(Object.values(filteredActions), 'actions');
  };

  return (
    <Fragment>
      <Sheet
        open={open}
        onOpenChange={(open) => {
          if (!open) setOpenedSections([]);
          setOpen(open);
        }}>
        <input type="hidden" name="actions_ids" value={formState.actions.map((a) => a.id).join(',')} />

        <Sheet.Trigger asChild>
          <Button type="button">
            Добавить действия <PlusFilledIcon {...stylex.props(styles.icon)} />
          </Button>
        </Sheet.Trigger>

        {!!formState.actions.length && (
          <Flex gap={8} rowGap={8}>
            {formState.actions.map((a) => (
              <Chips
                onRemove={() => {
                  handleRemove(a.name);
                }}
                withRemoveButton
                style={text.defaultMedium}
                value={a.id.toString()}
                key={a.id}>
                {a.name}
              </Chips>
            ))}
          </Flex>
        )}
        <Sheet.Content style={styles.root}>
          <Sheet.Header>
            <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Действия</h3>
            <Sheet.Close asChild>
              <IconButton size="sm" variant={IconButtonVariant.ghost}>
                <XIcon />
              </IconButton>
            </Sheet.Close>
          </Sheet.Header>
          <Stack style={styles.body} gap={24}>
            <Stack gap={16}>
              <TextInput
                value={actionQuery}
                onChange={(e) => {
                  setActionQuery(e.target.value);
                }}
                placeholder="Начните вводить"
                leftSection={<SearchIcon />}
              />
              <div {...stylex.props(styles.count, text.smallSemibold)}>
                Найдено: {totalCount} {getWordForm(totalCount, ['действие', 'действия', 'действий'])}
              </div>
            </Stack>

            <Accordion
              transitionDuration={1}
              value={openedSections}
              onChange={(e) => {
                setOpenedSections(e as string[]);
              }}
              multiple>
              <InfiniteScroll next={fetchMoreActionGroups} hasMore={hasMoreActionGroups} style={styles.list}>
                <GroupList
                  setValue={handleChange}
                  value={temp}
                  name={formState.name ? (formState.name === '' ? 'Существо' : formState.name) : 'Существо'}
                  openedSections={openedSections}
                  setOpenedSections={setOpenedSections}
                  actionGroupOptions={actionGroupOptions}
                />
              </InfiniteScroll>
            </Accordion>
          </Stack>

          <Sheet.Footer style={styles.footer}>
            <Button onClick={handleSave} width={ButtonWidth.full}>
              Сохранить
            </Button>
            <Button onClick={handleReset} width={ButtonWidth.full} variant={ButtonVariant.ghost}>
              Сбросить изменения
            </Button>
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet>
    </Fragment>
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
  title: {
    flex: '1'
  },
  body: {
    flex: '1',
    padding: '0 24px 24px'
  },
  icon: {
    height: 16,
    width: 16
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  count: {
    color: colors.textTertiaryDefault
  },
  footer: {
    display: 'flex',
    gap: 8
  }
});
