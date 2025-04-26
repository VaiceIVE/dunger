import * as stylex from '@stylexjs/stylex';
import { Container, Flex, Grid, headers, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { AnvilIcon } from '.';

/*const sections = [
  { label: '', description: '' },
  { label: '', description: '' },
  { label: '', description: '' },
  { label: '', description: '' }
];
*/
export const NoAuthPage = () => {
  return (
    <main {...stylex.props(styles.root)}>
      <Container>
        <Stack gap={80}>
          <div {...stylex.props(styles.banner)}>123</div>

          <Stack gap={28}>
            <Stack align="center" gap={16}>
              <h2 {...stylex.props(headers.h2Bold)}>Генератор существ в бестиарии</h2>
              <h3 {...stylex.props(headers.h3Medium)}>
                Создавайте уникальных монстров, зверей и существ для ваших приключений!
              </h3>
            </Stack>
            <Grid gap={16} rowGap={16}>
              <Grid.Col style={styles.card} span={6}>
                <Stack gap={32} style={styles.cardContent}>
                  <Flex justify={'space-between'} gap={32} wrap="nowrap" align="flex-start">
                    <Stack gap={12}>
                      <h3 {...stylex.props(headers.h3Semibold)}>Быстрая генерация</h3>
                      <div {...stylex.props(text.defaultMedium, styles.cardDescription)}>
                        Опишите идею в пару словах или настройте основные параметры – и ИИ создаст для вас существо с
                        характеристиками, способностями и описанием
                      </div>
                    </Stack>
                    <div>
                      <AnvilIcon />
                    </div>
                  </Flex>
                  <div {...stylex.props(styles.cardImage)}></div>
                </Stack>
              </Grid.Col>

              <Grid.Col style={styles.card} span={6}>
                123
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
};
const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  banner: {
    alignItems: 'flex-end',
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    gap: 32,
    height: 256,
    padding: 56
  },
  card: {
    alignItems: 'flex-end',
    backgroundColor: '#F6F6F7',

    borderRadius: 20,

    display: 'flex',
    gap: 32,
    padding: 32
  },
  cardImage: {
    backgroundColor: 'gray',
    display: 'flex',
    height: 222,
    alignSelf: 'center',
    width: 400
  },
  cardContent: {
    width: '100%'
  },
  cardDescription: {
    color: colors.textSecondaryDefault
  }
});
