import * as stylex from '@stylexjs/stylex';
import { Button, ButtonVariant, Container, Flex, Grid, headers, Stack, Tag, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { LoginButton } from 'features/LoginButton';
import banner from './_images/banner.png';
import { creatures, flowCard, words } from './mock';

export const NoAuthPage = () => {
  return (
    <main {...stylex.props(styles.root)}>
      <Container>
        <Stack gap={80}>
          <div {...stylex.props(styles.banner)}>
            <Stack gap={16}>
              <h1 {...stylex.props(headers.h1Bold)}>Создавай, кастомизируй, властвуй!</h1>
              <h3 {...stylex.props(headers.h3Medium)}>
                Полный контроль над созданием существ, персонажей, лута и окружения! 🚀
              </h3>
            </Stack>
            <LoginButton>
              <Button variant={ButtonVariant.accent}>Зарегистрироваться</Button>
            </LoginButton>
            <img src={banner} {...stylex.props(styles.bannerBg)} />
          </div>

          <Stack gap={28} align="center">
            <Stack align="center" gap={16}>
              <h2 {...stylex.props(headers.h2Bold)}>Генератор существ в бестиарии</h2>
              <h3 {...stylex.props(headers.h3Medium, styles.subheader)}>
                Создавайте уникальных монстров, зверей и существ для ваших приключений!
              </h3>
            </Stack>
            <Grid gap={16} rowGap={16}>
              {flowCard.map((c) => (
                <Grid.Col key={c.title} style={styles.card} span={6}>
                  <Stack gap={32} style={styles.cardContent}>
                    <Flex justify={'space-between'} gap={32} wrap="nowrap" align="flex-start">
                      <Stack gap={12}>
                        <h3 {...stylex.props(headers.h3Semibold)}>{c.title}</h3>
                        <div {...stylex.props(text.defaultMedium, styles.cardDescription)}>{c.description}</div>
                      </Stack>
                      <div {...stylex.props(styles.cardIcon)}>{c.icon}</div>
                    </Flex>
                    <img alt={c.title} src={c.image} {...stylex.props(styles.cardImage)} />
                  </Stack>
                </Grid.Col>
              ))}
            </Grid>
            <LoginButton>
              <Button variant={ButtonVariant.primary}>Зарегистрироваться и попробовать</Button>
            </LoginButton>
          </Stack>

          <Stack gap={28} align="center">
            <Stack align="center" gap={16}>
              <h2 {...stylex.props(headers.h2Bold)}>Существа, которые были сгенерированы и созданы у нас</h2>
              <h3 {...stylex.props(headers.h3Medium, styles.subheader)}>
                Бестиарий созданных и сгенерированных существ
              </h3>
            </Stack>
            <Grid gap={16} rowGap={16}>
              {creatures.map((c, index) => (
                <Grid.Col style={styles.creatureCard} span={4} key={index}>
                  <img {...stylex.props(styles.creatureImage)} src={c.image} />
                  <Tag color={c.isManual ? 'orange' : 'blue'}>{c.isManual ? 'Создано вручную' : 'Сгенерировано'}</Tag>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>

          <Flex justify="space-between" wrap="nowrap">
            <Stack gap={24}>
              <Stack gap={16}>
                <h2 {...stylex.props(headers.h2Bold)}>
                  Уникальные предметы <br />
                  для ваших персонажей
                </h2>
                <h3 {...stylex.props(headers.h3Medium, styles.subheader)}>
                  Поможем сгенерировать и подобрать предметы, которые будут
                  <br /> полезны именно вашим игрокам и существам
                </h3>
              </Stack>
              <Button>Зарегистрироваться и генерировать</Button>
            </Stack>
          </Flex>
          <Stack gap={28}>
            <Stack gap={16} align="center">
              <h2 {...stylex.props(headers.h2Bold)}>Генерируйте и добавляйте окружение в компанию</h2>
              <h3 {...stylex.props(headers.h3Medium, styles.h3ThirdSection, styles.subheader)}>
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
    borderRadius: 20,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    overflow: 'hidden',
    padding: 56,
    position: 'relative'
  },
  bannerBg: {
    backgroundColor: '#2a2a2a',
    height: '100%',
    left: 0,
    objectFit: 'fill',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1
  },
  subheader: {
    color: colors.textSecondaryDefault
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
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    height: 222,
    objectFit: 'cover',
    overflow: 'hidden',
    width: 400
  },
  cardContent: {
    width: '100%'
  },
  cardDescription: {
    color: colors.textSecondaryDefault
  },
  cardIcon: {
    alignItems: 'center',
    backgroundColor: colors.orange10,
    borderRadius: '50%',
    color: colors.brand90,
    display: 'flex',
    justifyContent: 'center',
    padding: 10
  },
  creatureImage: {
    backgroundColor: 'gray',
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 13,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    objectFit: 'cover',
    overflow: 'hidden',
    width: '100%'
  },
  creatureCard: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  word: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 12,
    color: colors.textSecondaryDefault,
    padding: '12px 20px'
  },
  h3ThirdSection: {
    textAlign: 'center'
  }
});
