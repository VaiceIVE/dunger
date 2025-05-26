import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  Button,
  ButtonVariant,
  Container,
  Grid,
  headers,
  SearchIcon,
  Stack,
  PlusIcon,
  TextInput,
  Flex,
  text
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { AddAdventure } from 'features/AddAdventure';
import { AdventureMaterials } from 'features/AdventureMaterials';
import { ApiAdventureListResult } from 'store/_types';
import { useDebouncedValue } from 'utils/_hooks/useDebouncedValue';
import { EmptyAdventuresList } from './_components/EmptyAdventuresList';

export const AdventuresListPage = () => {
  const [open, setOpen] = useState(false);

  const [nameQuery, setNameQuery] = useState('');
  const debouncedQuery = useDebouncedValue(nameQuery, 500);

  const authFetch = useAuthFetch();

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['adventures', { query: debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam.toString() });

      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }

      return authFetch<ApiAdventureListResult>(`/adventures?${params.toString()}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    },
    placeholderData: keepPreviousData
  });

  const adventures = data?.pages.flatMap((p) => p.adventures) ?? [];
  const workshopMaterials = data?.pages.length ? data.pages[0].workshopMaterials : null;

  return (
    <main {...stylex.props(styles.root)}>
      <Container style={styles.container}>
        <h1 {...stylex.props(headers.h1Bold)}>Мастерская</h1>
        <TextInput
          value={nameQuery}
          onChange={(e) => {
            setNameQuery(e.target.value);
          }}
          style={styles.input}
          placeholder="Поиск"
          leftSection={<SearchIcon />}
        />
        <AddAdventure open={open} setOpen={setOpen} />
        {!adventures.length && !isLoading && <EmptyAdventuresList setOpen={setOpen} />}
        {adventures.length > 0 && (
          <Fragment>
            <Stack gap={24}>
              <h3 {...stylex.props(headers.h3Bold)}>Все мои материалы</h3>
              <AdventureMaterials {...workshopMaterials} />
            </Stack>
            <Stack gap={20}>
              <Flex justify={'space-between'}>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  style={styles.button}
                  variant={ButtonVariant.secondary}>
                  <div {...stylex.props(styles.icon)}>
                    <PlusIcon {...stylex.props(styles.plus)} />
                  </div>
                  Создать приключение
                </Button>
              </Flex>
              <Grid gap={20} rowGap={20}>
                {adventures.map((a) => (
                  <Grid.Col asChild key={a.id} style={styles.card} span={6}>
                    <Link to={`/adventures/${a.id}`}>
                      <Stack style={styles.cardContent}>
                        <Stack gap={16}>
                          <Stack gap={8}>
                            <div {...stylex.props(text.subheaderSemibold)}>{a.name}</div>
                            <div {...stylex.props(text.defaultRegular, styles.genre)}>
                              {a.genre_name}
                              {!!a.keywords.length && ', '}
                              {a.keywords.join(', ')}
                            </div>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Link>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Fragment>
        )}
      </Container>
    </main>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40
  },
  input: {
    width: '50%'
  },
  button: {
    borderWidth: 1,
    gap: 16,
    height: 54,
    paddingInline: 20
  },
  plus: { height: 18, width: 18 },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.backgroundOrangeDefault,
    borderRadius: 8,
    color: colors.brand80,
    display: 'flex',
    justifyContent: 'center',
    padding: 6
  },
  card: {
    alignItems: 'flex-end',
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    gap: 16,
    padding: 20
  },
  cardContent: {
    flex: '1'
  },
  avatar: {
    borderRadius: 8
  },
  genre: {
    color: colors.textSecondaryDefault
  }
});
