import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  ButtonVariant,
  Container,
  FolderIcon,
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
import { BeastCard } from 'features/BeastCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { BestiaryList } from './_components/BestiaryList';

export const BestiaryPage = () => {
  const { id } = useParams();

  const isActiveCreature = !!id;

  return (
    <main>
      <Container>
        <SplitViewLayout isLayoutSplit={isActiveCreature}>
          <SplitViewLayout.Master>
            <Stack gap={29}>
              <h1 {...stylex.props(headers.h1Bold)}>Бестиарий</h1>

              <Stack gap={16}>
                <Grid gap={16}>
                  <Grid.Col span={isActiveCreature ? 11 : 6}>
                    <TextInput style={styles.input} placeholder="Поиск" leftSection={<SearchIcon />} />
                  </Grid.Col>
                  <Grid.Col span={isActiveCreature ? 1 : 6}>
                    <Button variant={ButtonVariant.accentSecondary}>Фильтры</Button>
                  </Grid.Col>
                </Grid>

                <BestiaryList isActiveCreature={isActiveCreature} />
              </Stack>
            </Stack>
          </SplitViewLayout.Master>

          <SplitViewLayout.Detail>
            <BeastCard
              style={styles.card}
              controls={
                <Fragment>
                  <IconButton size="sm">
                    <PencilIcon />
                  </IconButton>
                  <IconButton size="sm">
                    <LinkIcon />
                  </IconButton>
                  <IconButton size="sm">
                    <FolderIcon />
                  </IconButton>
                  <Link to={'/bestiary'}>
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
