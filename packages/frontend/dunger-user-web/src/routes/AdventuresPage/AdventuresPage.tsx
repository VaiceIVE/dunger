import * as stylex from '@stylexjs/stylex';
import {
  Button,
  ButtonVariant,
  Container,
  Grid,
  headers,
  SearchIcon,
  Stack,
  PlusIcon,
  TextInput,
  Flex,
  ProgressBar,
  Avatar,
  PhotoIcon,
  text,
  SelectorIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const AdventuresPage = () => {
  return (
    <main {...stylex.props(styles.root)}>
      <Container>
        <Stack gap={40}>
          <h1 {...stylex.props(headers.h1Bold)}>Мои приключения</h1>
          <TextInput style={styles.input} placeholder="Поиск" leftSection={<SearchIcon />} />

          <Stack gap={20}>
            <Flex justify={'space-between'}>
              <Button style={styles.button} variant={ButtonVariant.secondary}>
                <div {...stylex.props(styles.icon)}>
                  <PlusIcon {...stylex.props(styles.plus)} />
                </div>
                Создать приключение
              </Button>
              <Button variant={ButtonVariant.secondary}>
                Сначала новые <SelectorIcon />
              </Button>
            </Flex>
            <Grid gap={20} rowGap={20}>
              <Grid.Col style={styles.card} span={6}>
                <Stack style={styles.cardContent}>
                  <Stack gap={16}>
                    <Stack gap={8}>
                      <div {...stylex.props(text.subheaderSemibold)}>Рейвентаун</div>
                      <div {...stylex.props(text.defaultRegular, styles.genre)}>Хоррор, вампиры, город</div>
                    </Stack>
                    <ProgressBar value={20} max={25} title={'Создано'} description={'партий'} />
                  </Stack>
                </Stack>

                <Avatar stubIcon={<PhotoIcon />} style={styles.avatar} size={84} />
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
  input: {
    width: '50%'
  },
  button: {
    borderWidth: 1,
    gap: 16,
    height: 54,
    paddingInline: 20
  },
  plus: { height: 18, width: 18 },
  icon: {
    alignItems: 'center',
    backgroundColor: colors.backgroundOrangeDefault,
    borderRadius: 8,
    color: colors.brand80,
    display: 'flex',
    justifyContent: 'center',
    padding: 6
  },
  card: {
    alignItems: 'flex-end',
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    gap: 16,
    padding: 20
  },
  cardContent: {
    flex: '1'
  },
  avatar: {
    borderRadius: 8
  },
  genre: {
    color: colors.textSecondaryDefault
  }
});
