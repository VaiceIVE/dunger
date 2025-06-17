import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  Button,
  ButtonVariant,
  Container,
  Flex,
  Grid,
  headers,
  IconButton,
  InfiniteScroll,
  LinkIcon,
  PencilIcon,
  SearchIcon,
  Stack,
  text,
  TextInput,
  XIcon
} from '@dunger/ui';
import { Directory, DirectoryItem } from 'components/Directory';
import { Skeleton } from 'components/Skeleton';
import { BeastCard } from 'features/BeastCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { ApiCreature, ApiCreatureListResult } from 'store/_types';
import { useDebouncedValue } from 'utils/_hooks/useDebouncedValue';
import { AddToCampaign } from './_components/AddToCampaign';

export const MyBestiaryPage = () => {
  const { id } = useParams();

  const isActiveCreature = !!id;

  const [nameQuery, setNameQuery] = useState('');
  const debouncedQuery = useDebouncedValue(nameQuery, 500);

  const authFetch = useAuthFetch();

  const {
    data: data,
    fetchNextPage: fetchMoreCreatures,
    hasNextPage: hasMoreCreatures,
    isLoading: loading
  } = useInfiniteQuery({
    queryKey: ['creatures-user', { query: debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam.toString() });

      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }

      return authFetch<ApiCreatureListResult>(`/creatures/user?${params.toString()}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    }
  });

  const { data: beast } = useQuery({
    queryKey: ['creatures', { id }],
    queryFn: () => authFetch<ApiCreature>(`/creatures/${id ?? ''}`),
    enabled: isActiveCreature,
    placeholderData: keepPreviousData
  });

  const creatures = data?.pages.flatMap((p) => p.creatures) ?? [];

  return (
    <main>
      <Container>
        <SplitViewLayout isLayoutSplit={isActiveCreature}>
          <SplitViewLayout.Master>
            <Stack gap={40}>
              <h1 {...stylex.props(headers.h1Bold)}>Мои существа</h1>

              <Stack gap={24}>
                <Grid gap={16}>
                  <Grid.Col span={isActiveCreature ? 11 : 6}>
                    <TextInput
                      value={nameQuery}
                      onChange={(e) => {
                        setNameQuery(e.target.value);
                      }}
                      style={styles.input}
                      placeholder="Поиск"
                      leftSection={<SearchIcon />}
                    />
                  </Grid.Col>
                  <Grid.Col span={isActiveCreature ? 1 : 6}>
                    <Button disabled variant={ButtonVariant.accentSecondary}>
                      Фильтры
                    </Button>
                  </Grid.Col>
                </Grid>

                <InfiniteScroll hasMore={hasMoreCreatures} next={fetchMoreCreatures}>
                  <Directory>
                    {loading &&
                      Array.from({ length: 16 }, (_, index) => index).map((c) => (
                        <DirectoryItem gap={8} key={c}>
                          <DirectoryItem.Title>
                            <div {...stylex.props(styles.skeletonTitle)}>
                              <Skeleton />
                            </div>
                          </DirectoryItem.Title>
                          <DirectoryItem.Content>
                            <div {...stylex.props(styles.skeletonContent)}>
                              <Skeleton />
                            </div>
                          </DirectoryItem.Content>
                        </DirectoryItem>
                      ))}

                    {creatures.map((c) => (
                      <DirectoryItem
                        fullWidth={isActiveCreature}
                        active={c.id === id}
                        key={c.id}
                        to={`/my-bestiary/${c.id}`}>
                        <DirectoryItem.Title>{c.name}</DirectoryItem.Title>
                        <DirectoryItem.Content>
                          <Flex gap={5}>
                            <div {...stylex.props(text.defaultSemibold)}>{c.challenge_rating},</div>
                            <div {...stylex.props(text.defaultMedium)}>
                              {c.type_name ?? 'тип не выбран'}, {c.alignment_name ?? 'мировозрение не выбрано'}
                            </div>
                          </Flex>
                        </DirectoryItem.Content>
                      </DirectoryItem>
                    ))}
                  </Directory>
                </InfiniteScroll>
              </Stack>
            </Stack>
          </SplitViewLayout.Master>

          <SplitViewLayout.Detail>
            <BeastCard
              beast={beast}
              style={styles.card}
              controls={
                <Fragment>
                  <IconButton size="sm">
                    <LinkIcon />
                  </IconButton>
                  <Link to={`/beast/${beast?.id ?? ''}`}>
                    <IconButton size="sm">
                      <PencilIcon />
                    </IconButton>
                  </Link>
                  <AddToCampaign />
                  <Link to={'/my-bestiary'} preventScrollReset>
                    <IconButton size="sm">
                      <XIcon />
                    </IconButton>
                  </Link>
                </Fragment>
              }
            />
          </SplitViewLayout.Detail>
        </SplitViewLayout>
      </Container>
    </main>
  );
};

const styles = stylex.create({
  input: {
    width: {
      default: '100%',
      ':is([aria-selected=true])': '100%'
    }
  },
  card: {
    height: 'calc(100dvh - 64px)',
    position: 'sticky',
    right: 0,
    top: 32
  },
  skeletonTitle: {
    borderRadius: 2,
    height: 20,
    overflow: 'hidden',
    width: '25%'
  },
  skeletonContent: {
    borderRadius: 2,
    height: 21,
    overflow: 'hidden',
    width: '70%'
  }
});
