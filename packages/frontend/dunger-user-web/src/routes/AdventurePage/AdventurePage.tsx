import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  BatIcon,
  BeachIcon,
  Container,
  Flex,
  Grid,
  headers,
  IconButton,
  PencilIcon,
  PlusIcon,
  Stack,
  Tag,
  text,
  WandIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { AdventureMaterials } from 'features/AdventureMaterials';
import { ApiAdventure } from 'store/_types/ApiAdventure';
import { invariant } from 'utils/invariant';
import { genreBanners } from './genreBanners';

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
        <img src={genreBanners[adventure.genre.name]} {...stylex.props(styles.banner)} />

        <Stack gap={16}>
          <Flex gap={10}>
            <h1 {...stylex.props(headers.h1Bold)}>{adventure.name}</h1>
            <IconButton size="sm">
              <PencilIcon />
            </IconButton>
          </Flex>
          <Flex gap={12}>
            <Tag color="blue">{adventure.genre.name}</Tag>
            {adventure.keywords.map((k) => (
              <Tag key={k.id}>{k.name}</Tag>
            ))}
          </Flex>
        </Stack>

        <Stack gap={24}>
          <Flex gap={16}>
            <h3 {...stylex.props(headers.h3Bold)}>Разделы</h3>
            <IconButton size="sm">
              <PlusIcon />
            </IconButton>
          </Flex>

          <Grid rowGap={20} gap={20}>
            <Grid.Col style={styles.section} span={4}>
              <Stack gap={16}>
                <div {...stylex.props(text.subheaderSemibold)}>Раздел 1</div>
                <Flex gap={10} rowGap={10}>
                  <div {...stylex.props(styles.tag(colors.brand80, colors.orange10))}>
                    <div {...stylex.props(text.defaultMedium, styles.tagCount)}>0</div>
                    <BeachIcon {...stylex.props(styles.tagIcon)} />
                  </div>
                  <div {...stylex.props(styles.tag(colors.red60, colors.red5))}>
                    <div {...stylex.props(text.defaultMedium, styles.tagCount)}>0</div>
                    <BatIcon {...stylex.props(styles.tagIcon)} />
                  </div>
                  <div {...stylex.props(styles.tag(colors.purple70, colors.purple20))}>
                    <div {...stylex.props(text.defaultMedium, styles.tagCount)}>0</div>
                    <WandIcon {...stylex.props(styles.tagIcon)} />
                  </div>
                </Flex>
              </Stack>
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
  banner: {
    height: 'auto',
    objectFit: 'contain',
    width: '100%'
  },
  section: {
    alignItems: 'center',
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10,
    display: 'flex',
    gap: 16,
    justifyContent: 'space-between',
    padding: 16
  },
  tag: (color: string, backgroundColor: string) => ({
    alignItems: 'center',
    backgroundColor,
    borderRadius: 8,
    color,
    display: 'flex',
    gap: 4,
    padding: '2px 6px',
    width: 'fit-content'
  }),
  tagIcon: {
    height: '14px',
    width: '14px'
  },
  tagCount: {
    color: colors.textPrimaryDefault
  }
});
