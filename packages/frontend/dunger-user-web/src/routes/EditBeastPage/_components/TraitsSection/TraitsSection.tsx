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
import { ApiTrait, ApiPaginatedResult } from 'store/_types';
import { useDebouncedValue } from 'utils/_hooks/useDebouncedValue';
import { getWordForm } from 'utils/getWordForm';
import { SectionProps } from '../BeastForm/BeastForm';
import { GroupList } from './_components/GroupList';

export const TraitsSection = ({ formState, handleFieldChange }: SectionProps) => {
  const authFetch = useAuthFetch();

  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState<Record<string, ApiTrait>>(
    Object.fromEntries(formState.traits.map((trait) => [trait.name, trait]))
  );
  const [openedSections, setOpenedSections] = useState<string[]>([]);

  const [traitQuery, setTraitQuery] = useState('');
  const debouncedQuery = useDebouncedValue(traitQuery);

  const {
    data: traitGroups,
    fetchNextPage: fetchMoreTraitGroups,
    hasNextPage: hasMoreTraitGroups
  } = useInfiniteQuery({
    queryKey: ['creatures', 'trait-groups', { query: debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam.toString() });

      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }

      return authFetch<{ results: { name: string; count: number }[] } & ApiPaginatedResult>(
        `/creatures/traits/groups?${params.toString()}`
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    }
  });

  const totalCount = traitGroups?.pages.length ? traitGroups.pages[0].pagination.totalCount : 0;
  const traitGroupOptions = traitGroups?.pages.flatMap((p) => p.results) ?? [];

  const handleSave = () => {
    const traits = Object.values(temp);
    handleFieldChange(traits, 'traits');
    setOpen(false);
  };

  const handleReset = () => {
    setTemp(Object.fromEntries(formState.traits.map((trait) => [trait.name, trait])));
  };

  const handleChange = (traitObj: Record<string, ApiTrait>) => {
    setTemp((prev) => ({ ...prev, ...traitObj }));
  };

  const handleRemove = (traitName: string) => {
    const { [traitName]: unused, ...filteredTraits } = temp;
    void unused;

    setTemp(filteredTraits);

    handleFieldChange(Object.values(filteredTraits), 'traits');
  };

  return (
    <Fragment>
      <Sheet
        open={open}
        onOpenChange={(open) => {
          if (!open) setOpenedSections([]);
          setOpen(open);
        }}>
        <input type="hidden" name="traits_ids" value={formState.traits.map((t) => t.id).join(',')} />

        <Sheet.Trigger asChild>
          <Button type="button">
            Добавить способности <PlusFilledIcon {...stylex.props(styles.icon)} />
          </Button>
        </Sheet.Trigger>

        {!!formState.traits.length && (
          <Flex gap={8} rowGap={8}>
            {formState.traits.map((a) => (
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
            <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Особенности</h3>
            <Sheet.Close asChild>
              <IconButton size="sm" variant={IconButtonVariant.ghost}>
                <XIcon />
              </IconButton>
            </Sheet.Close>
          </Sheet.Header>
          <Stack style={styles.body} gap={24}>
            <Stack gap={16}>
              <TextInput
                value={traitQuery}
                onChange={(e) => {
                  setTraitQuery(e.target.value);
                }}
                placeholder="Начните вводить"
                leftSection={<SearchIcon />}
              />
              <div {...stylex.props(styles.count, text.smallSemibold)}>
                Найдено: {totalCount} {getWordForm(totalCount, ['особенность', 'особенности', 'особенностей'])}
              </div>
            </Stack>

            <Accordion
              transitionDuration={1}
              value={openedSections}
              onChange={(e) => {
                setOpenedSections(e as string[]);
              }}
              multiple>
              <InfiniteScroll next={fetchMoreTraitGroups} hasMore={hasMoreTraitGroups} style={styles.list}>
                <GroupList
                  setValue={handleChange}
                  value={temp}
                  name={formState.name ? (formState.name === '' ? 'Существо' : formState.name) : 'Существо'}
                  openedSections={openedSections}
                  setOpenedSections={setOpenedSections}
                  traitGroupOptions={traitGroupOptions}
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
