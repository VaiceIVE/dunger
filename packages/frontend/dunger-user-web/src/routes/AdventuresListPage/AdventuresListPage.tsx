import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
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
  text,
  SelectorIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiPaginatedResult } from 'store/_types/_common';
import { ApiAdventureList } from 'store/_types/ApiAdventureList';
import { AddAdventure } from './_components/AddAdventure';
import { EmptyAdventuresList } from './_components/EmptyAdventuresList';

export const AdventuresListPage = () => {
  const [open, setOpen] = useState(false);

  const authFetch = useAuthFetch();

  const { data } = useSuspenseQuery<{ adventures: ApiAdventureList } & ApiPaginatedResult>({
    queryKey: ['adventure'],
    queryFn: () => authFetch(`/adventure`)
  });

  const adventures = data.adventures;

  return (
    <main {...stylex.props(styles.root)}>
      <Container style={styles.container}>
        <h1 {...stylex.props(headers.h1Bold)}>Мастерская</h1>
        <TextInput style={styles.input} placeholder="Поиск" leftSection={<SearchIcon />} />
        <AddAdventure open={open} setOpen={setOpen} />
        {adventures.length === 0 && <EmptyAdventuresList setOpen={setOpen} />}
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
            <Button variant={ButtonVariant.secondary}>
              Сначала новые <SelectorIcon />
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
