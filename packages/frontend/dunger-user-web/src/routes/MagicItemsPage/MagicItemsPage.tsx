import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  ButtonVariant,
  Container,
  Grid,
  headers,
  IconButton,
  LinkIcon,
  PencilIcon,
  SearchIcon,
  Stack,
  TextInput,
  XIcon
} from '@dunger/ui';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { MagicItemList } from './_components/MagicItemList';
import { MagicItemCard } from './_components/MagicItemCard';

export const MagicItemsPage = () => {
  const { id } = useParams();

  const isActiveItem = !!id;

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
                    <TextInput style={styles.input} placeholder="Поиск" leftSection={<SearchIcon />} />
                  </Grid.Col>
                  <Grid.Col span={isActiveItem ? 1 : 6}>
                    <Button variant={ButtonVariant.accentSecondary}>Фильтры</Button>
                  </Grid.Col>
                </Grid>

                <MagicItemList isActiveItem={isActiveItem} />
              </Stack>
            </Stack>
          </SplitViewLayout.Master>

          <SplitViewLayout.Detail>
            <MagicItemCard
              style={styles.card}
              controls={
                <Fragment>
                  <IconButton size="sm">
                    <LinkIcon />
                  </IconButton>
                  <IconButton size="sm">
                    <PencilIcon />
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
