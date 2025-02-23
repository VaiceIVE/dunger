import * as stylex from '@stylexjs/stylex';
import { useParams } from 'react-router-dom';
import { Button, ButtonVariant, Container, Grid, headers, SearchIcon, Stack, TextInput } from '@dunger/ui';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { BestiaryCard } from './_components/BestiaryCard';
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
            <BestiaryCard />
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
  }
});
