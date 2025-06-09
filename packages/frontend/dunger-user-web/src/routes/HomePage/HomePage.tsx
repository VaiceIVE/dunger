import * as stylex from '@stylexjs/stylex';
import {
  Button,
  ButtonVariant,
  Container,
  Flex,
  Grid,
  headers,
  PlusIcon,
  SearchIcon,
  Stack,
  text,
  TextInput
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { AdventureMaterials } from 'features/AdventureMaterials';

const cards = [
  { count: 345, name: 'Бестиарий' },
  { count: 8, name: 'Классы' },
  { count: 12, name: 'Расы' },
  { count: 213, name: 'Предметы' }
];

export function HomePage() {
  return (
    <main {...stylex.props(styles.root)}>
      <Container>
        <Grid gap={32}>
          <Grid.Col span={9}>
            <Stack gap={40}>
              <TextInput placeholder="Поиск" leftSection={<SearchIcon />} />
              <Flex gap={16}>
                {cards.map((s) => (
                  <div {...stylex.props(styles.card)} key={s.name}>
                    <Stack gap={8}>
                      <h2 {...stylex.props(headers.h2Bold)}>{s.count}</h2>
                      <div {...stylex.props(text.subheaderSemibold)}>{s.name}</div>
                    </Stack>
                  </div>
                ))}
              </Flex>
              <div {...stylex.props(styles.adBanner)}>
                <Flex gap={20} justify="space-between" style={styles.adBannerContent} align="flex-end">
                  <Stack gap={8}>
                    <h3 {...stylex.props(headers.h3Bold)}>Здесь начинается твой путь!</h3>
                    <div {...stylex.props(text.defaultMedium)}>
                      Создай свое первое приключения, планируй партии и все, что будет происходить в них. <br />
                      Теперь приключение можно построить буквально из кирпичиков, избегая всю рутину!
                    </div>
                  </Stack>
                  <Button variant={ButtonVariant.accent}>
                    Создать приключение <PlusIcon width={16} height={16} />
                  </Button>
                </Flex>
              </div>
              <Stack gap={24}>
                <h3 {...stylex.props(headers.h3Bold)}>Мои материалы</h3> <AdventureMaterials />
              </Stack>
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 16,
    display: 'flex',
    flex: '1',
    height: 138,
    outlineColor: { default: 'transparent', ':hover': colors.outlinePrimaryHover },
    outlineStyle: 'solid',
    outlineWidth: '2px',
    paddingLeft: 24,
    transition: 'all 0.2s'
  },
  adBanner: {
    alignItems: 'center',
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 12,
    display: 'flex',
    flex: '1',
    height: 138,
    padding: 24
  },
  adBannerContent: {
    width: '100%'
  }
});
