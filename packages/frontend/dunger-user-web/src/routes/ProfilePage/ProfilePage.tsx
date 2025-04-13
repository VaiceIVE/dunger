import { Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Container,
  Grid,
  headers,
  Stack,
  Flex,
  text,
  PencilIcon,
  IconButton,
  IconButtonVariant,
  TextInput,
  Modal,
  Button,
  ButtonVariant,
  ButtonWidth
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

const sections = [
  { id: 'email', label: 'Email' },
  { id: 'login', label: 'Логин' }
];
export const ProfilePage = () => {
  const [openedSections, setOpenedSections] = useState<string[]>([]);
  return (
    <main>
      <Container>
        <Stack gap={40}>
          <h1 {...stylex.props(headers.h2Bold)}>Мой профиль</h1>
          <Grid>
            <Grid.Col span={7}>
              <h3 {...stylex.props(headers.h3Bold)}>Системные данные</h3>
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={7}>
              <Stack gap={8}>
                {sections.map((s) => (
                  <Flex justify="space-between" style={styles.profileBlock} key={s.id}>
                    {openedSections.includes(s.id) ? (
                      <Stack gap={16} style={styles.form}>
                        <TextInput label={s.label} />
                        <Flex gap={8}>
                          <Button>Подтвердить изменения</Button>
                          <Button
                            variant={ButtonVariant.secondary}
                            onClick={() => {
                              setOpenedSections((prev) => prev.filter((p) => p != s.id));
                            }}>
                            Отменить
                          </Button>
                        </Flex>
                      </Stack>
                    ) : (
                      <Fragment>
                        <div>
                          <span {...stylex.props(text.subheaderSemibold)}>{s.label}: </span>
                          <span {...stylex.props(text.defaultRegular, styles.profileValue)}>galyagalya122</span>
                        </div>
                        <IconButton
                          variant={IconButtonVariant.ghost}
                          onClick={() => {
                            setOpenedSections((prev) => [...prev, s.id]);
                          }}>
                          <PencilIcon />
                        </IconButton>
                      </Fragment>
                    )}
                  </Flex>
                ))}

                <Modal>
                  <Flex justify="space-between" style={styles.profileBlock}>
                    <div>
                      <span {...stylex.props(text.subheaderSemibold)}>Пароль: </span>
                      <span {...stylex.props(text.defaultRegular, styles.profileValue)}>galyagalya122</span>
                    </div>
                    <Modal.Target>
                      <IconButton variant={IconButtonVariant.ghost}>
                        <PencilIcon />
                      </IconButton>
                    </Modal.Target>
                  </Flex>

                  <Modal.Content style={styles.modalContent}>
                    <h2 {...stylex.props(headers.h2Bold)}>Смена пароля</h2>
                    <Stack gap={24}>
                      <TextInput label="Придумайте новый пароль"></TextInput>
                      <TextInput label="Подтвердите пароль"></TextInput>
                    </Stack>
                    <Button variant={ButtonVariant.accent} width={ButtonWidth.full}>
                      Подтвердить
                    </Button>
                  </Modal.Content>
                </Modal>
              </Stack>
            </Grid.Col>

            <Grid.Col span={5}>
              <div></div>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </main>
  );
};

const styles = stylex.create({
  form: {
    width: '100%'
  },

  profileBlock: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10,
    padding: '10px 20px'
  },
  description: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10
  },
  control: {
    color: colors.textPrimaryDefault,
    padding: 16
  },
  chevron: {
    color: colors.brand90
  },
  panel: {
    paddingBottom: 16,
    paddingInline: 16
  },
  profileValue: {
    color: colors.textSecondaryDefault
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }
});
