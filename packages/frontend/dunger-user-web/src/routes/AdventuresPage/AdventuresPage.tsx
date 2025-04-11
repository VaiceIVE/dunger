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
  text
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const AdventuresPage = () => {
  return (
    <main>
      <Container>
        <Stack gap={40}>
          <h1 {...stylex.props(headers.h1Bold)}>Мои приключения</h1>
          <TextInput style={styles.input} placeholder="Поиск" leftSection={<SearchIcon />} />

          <Stack gap={20}>
            <Flex justify={'space-between'}>
              <Button style={styles.button} variant={ButtonVariant.secondary}>
                <div {...stylex.props(styles.icon)}>
                  <PlusIcon {...stylex.props(styles.plus)}> </PlusIcon>
                </div>
                Создать приключение
              </Button>
              <Button variant={ButtonVariant.secondary}>Сначала новые</Button>
            </Flex>
            <Grid gap={20} rowGap={20}>
              <Grid.Col span={6}>
                <div {...stylex.props(styles.card)}>
                  <Stack style={styles.cardContent}>
                    <Stack gap={16}>
                      <Stack gap={8}>
                        <div {...stylex.props(text.subheaderSemibold)}>Рейвентаун</div>
                        <div {...stylex.props(text.defaultRegular, styles.genre)}>Хоррор, вампиры, город</div>
                      </Stack>
                      <ProgressBar value={20} max={25} title={'Создано'} description={'партий'}></ProgressBar>
                    </Stack>
                  </Stack>

                  <Avatar stubIcon={<PhotoIcon />} style={styles.avatar} size={84} />
                </div>
              </Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
};

const styles = stylex.create({
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
  icon: { backgroundColor: colors.backgroundOrangeDefault, borderRadius: 8, color: colors.brand80, padding: 6 },
  card: {
    alignItems: 'flex-end',
    borderRadius: 12,
    boxShadow: {
      default: 'none',
      ':hover': '0 4px 4px -4px #0C0C0D0D, 0 16px 32px -4px #0C0C0D1A'
    },
    display: 'flex',
    gap: 16,
    outlineColor: {
      default: colors.outlinePrimaryDefault,
      ':hover': colors.outlinePrimaryHover
    },
    outlineStyle: 'solid',
    outlineWidth: {
      default: '1px',
      ':is([aria-selected=true])': '2px'
    },
    padding: 20,
    transition: 'all 0.2s',
    width: '100%'
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
