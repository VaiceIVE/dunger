import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import { ArrowRightIcon, Container, Flex, Grid, headers, IconButton, PencilIcon, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { AdventureMaterials } from 'features/AdventureMaterials';
import { ApiAdventure } from 'store/_types/ApiAdventure';
import { invariant } from 'utils/invariant';

export const AdventurePage = () => {
  const { id } = useParams();
  invariant(id);

  const authFetch = useAuthFetch();
  const { data: adventure } = useSuspenseQuery({
    queryKey: ['creatures', { id }],
    queryFn: () => authFetch<ApiAdventure>(`/adventure/${id}`)
  });

  return (
    <main {...stylex.props(styles.root)}>
      <Container style={styles.container}>
        <Flex gap={10}>
          <h1 {...stylex.props(headers.h1Bold)}>{adventure.name}</h1>
          <IconButton size="sm">
            <PencilIcon />
          </IconButton>
        </Flex>
        <Stack gap={24}>
          <h3 {...stylex.props(headers.h3Bold)}>Разделы</h3>
          <Grid rowGap={20} gap={20}>
            <Grid.Col style={styles.section} span={4}>
              <Stack gap={16}>
                <div {...stylex.props(text.subheaderSemibold)}>Раздел 1</div>
                <Flex gap={8} rowGap={8}></Flex>
              </Stack>
              <IconButton style={styles.sectionButton}>
                <ArrowRightIcon />
              </IconButton>
            </Grid.Col>
          </Grid>
        </Stack>
        <Stack gap={24}>
          <h3 {...stylex.props(headers.h3Bold)}>Материалы приключения</h3>
          <AdventureMaterials />
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
  section: {
    alignItems: 'center',
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10,
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
    padding: 16
  },
  sectionButton: {
    marginLeft: 'auto'
  }
});
