import * as stylex from '@stylexjs/stylex';
import { useParams } from 'react-router-dom';
import { Container, headers, Stack } from '@dunger/ui';
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
                <div>Поиск</div>
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
