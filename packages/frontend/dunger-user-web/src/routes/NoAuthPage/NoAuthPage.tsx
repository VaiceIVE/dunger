import * as stylex from '@stylexjs/stylex';
import { Button, ButtonVariant, Container, Flex, Grid, headers, Stack, Tag, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { words } from './mock';
import { AnvilIcon } from '.';

const sections = [
  { url: '', isManual: true },
  { url: '', isManual: false },
  { url: '', isManual: false },
  { url: '', isManual: true },
  { url: '', isManual: false },
  { url: '', isManual: true }
];

export const NoAuthPage = () => {
  return (
    <main {...stylex.props(styles.root)}>
      <Container>
        <Stack gap={80}>
          <div {...stylex.props(styles.banner)}>
            <Stack gap={32}>
              <Stack gap={16}>
                <h1 {...stylex.props(headers.h1Bold)}>Создавай, кастомизируй, властвуй!</h1>
                <h3 {...stylex.props(headers.h3Medium)}>
                  Полный контроль над созданием существ, персонажей, лута и окружения! 🚀
                </h3>
              </Stack>
              <Button variant={ButtonVariant.accent}>Зарегистрироваться</Button>
            </Stack>
          </div>

          <Stack gap={28} align="center">
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
            </Grid>
            <Button variant={ButtonVariant.primary}>Зарегистрироваться и попробовать</Button>
          </Stack>

          <Stack gap={28} align="center">
            <Stack align="center" gap={16}>
              <h2 {...stylex.props(headers.h2Bold)}>Существа, которые были сгенерированы и созданы у нас</h2>
              <h3 {...stylex.props(headers.h3Medium)}>Бестиарий созданных и сгенерированных существ</h3>
            </Stack>
            <Grid gap={16} rowGap={16}>
              {sections.map((s, index) => (
                <Grid.Col style={styles.creatureSection} span={4} key={index}>
                  <img {...stylex.props(styles.creatureImage)} />
                  <Tag color={s.isManual ? 'orange' : 'blue'}>{s.isManual ? 'Создано вручную' : 'Сгенерировано'}</Tag>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
          <Flex rowGap={48} justify="space-between" wrap="nowrap">
            <Stack gap={24}>
              <Stack gap={16}>
                <h2 {...stylex.props(headers.h2Bold)}>
                  Уникальные предметы <br />
                  для ваших персонажей
                </h2>
                <h3 {...stylex.props(headers.h3Medium)}>
                  Поможем сгенерировать и подобрать предметы, которые будут
                  <br /> полезны именно вашим игрокам и существам
                </h3>
              </Stack>
              <Button>Зарегистрироваться и генерировать</Button>
            </Stack>
            <img {...stylex.props(styles.creatureImage)}></img>
          </Flex>
          <Stack gap={28}>
            <Stack gap={16} align="center">
              <h2 {...stylex.props(headers.h2Bold)}>Генерируйте и добавляйте окружение в компанию</h2>
              <h3 {...stylex.props(headers.h3Medium, styles.h3ThirdSection)}>
                Мы покажем вам лаконичное описание в виде тэгов, чтобы быстро
                <br /> ориентироваться в ходе игры
              </h3>
            </Stack>
            <Flex gap={12} rowGap={12} justify="center">
              {words.map((w) => (
                <div {...stylex.props(styles.word, text.smallMedium)} key={w}>
                  {w}
                </div>
              ))}
            </Flex>
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
    alignItems: 'flex-start',
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
    borderRadius: 12,

    width: 400
  },
  cardContent: {
    width: '100%'
  },
  cardDescription: {
    color: colors.textSecondaryDefault
  },
  creatureImage: {
    backgroundColor: 'gray',
    display: 'flex',
    height: 296,
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 13,
    borderStyle: 'solid',
    borderWidth: 1,
    width: 470
  },
  creatureSection: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    height: 256
  },
  word: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 12,
    padding: '12px 20px',
    color: colors.textSecondaryDefault
  },
  h3ThirdSection: {
    textAlign: 'center'
  }
});
