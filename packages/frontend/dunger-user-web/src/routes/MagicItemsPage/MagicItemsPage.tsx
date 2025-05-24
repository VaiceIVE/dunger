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
  SearchIcon,
  Stack,
  Tag,
  TextInput,
  XIcon
} from '@dunger/ui';
import { Directory, DirectoryItem } from 'components/Directory';
import { MagicItemCard } from 'features/MagicItemCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { ApiMagicItem } from 'store/_types/magic-item/ApiMagicItem';
import { ApiMagicItemListResult } from 'store/_types/magic-item/ApiMagicItemList';
import { useDebouncedValue } from 'utils/_hooks/useDebouncedValue';

export const MagicItemsPage = () => {
  const { id } = useParams();

  const isActiveItem = !!id;

  const [nameQuery, setNameQuery] = useState('');
  const debouncedQuery = useDebouncedValue(nameQuery, 500);

  const authFetch = useAuthFetch();

  const {
    data,
    fetchNextPage: fetchMoreMagicItems,
    hasNextPage: hasMoreMagicItems
  } = useInfiniteQuery({
    queryKey: ['magic-items', { query: debouncedQuery }],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({ offset: pageParam.toString() });

      if (debouncedQuery) {
        params.set('query', debouncedQuery);
      }

      return authFetch<ApiMagicItemListResult>(`/magic-items?${params.toString()}`);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { offset, limit, totalCount } = lastPage.pagination;
      const nextOffset = offset + limit;
      return nextOffset < totalCount ? nextOffset : undefined;
    }
  });

  const { data: magicItem } = useQuery({
    queryKey: ['magic-items', { id }],
    queryFn: () => authFetch<ApiMagicItem>(`/magic-items/${id ?? ''}`),
    enabled: isActiveItem,
    placeholderData: keepPreviousData
  });

  const magicItems = data?.pages.flatMap((p) => p.magicItems) ?? [];

  return (
    <main>
      <Container>
        <SplitViewLayout isLayoutSplit={isActiveItem}>
          <SplitViewLayout.Master>
            <Stack gap={40}>
              <h1 {...stylex.props(headers.h1Bold)}>Магические предметы</h1>

              <Stack gap={24}>
                <Grid gap={16}>
                  <Grid.Col span={isActiveItem ? 11 : 6}>
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
                  <Grid.Col span={isActiveItem ? 1 : 6}>
                    <Button variant={ButtonVariant.accentSecondary}>Фильтры</Button>
                  </Grid.Col>
                </Grid>

                <InfiniteScroll hasMore={hasMoreMagicItems} next={fetchMoreMagicItems}>
                  <Directory>
                    {magicItems.map((i) => (
                      <DirectoryItem
                        active={i.id === id}
                        fullWidth={isActiveItem}
                        key={i.id}
                        to={`/magic-items/${i.id}`}>
                        <DirectoryItem.Title>{i.name}</DirectoryItem.Title>
                        <DirectoryItem.Content>
                          <Flex gap={8}>
                            <Tag color="yellow">{i.cost}</Tag>
                            <Tag color="black">{i.rarity_name}</Tag>
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
            <MagicItemCard
              magicItem={magicItem}
              style={styles.card}
              controls={
                <Fragment>
                  <IconButton size="sm">
                    <LinkIcon />
                  </IconButton>

                  <Link to={'/magic-items'}>
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
  }
});
