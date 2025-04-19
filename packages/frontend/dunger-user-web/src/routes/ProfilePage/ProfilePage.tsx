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
    <main {...stylex.props(styles.root)}>
      <Container>
        <Grid gap={16} align="flex-start">
          <Grid.Col span={7}>
            <Stack gap={40}>
              <h1 {...stylex.props(headers.h2Bold)}>Мой профиль</h1>
              <Stack gap={20}>
                <h3 {...stylex.props(headers.h3Bold)}>Системные данные</h3>
                <Stack gap={8}>
                  {sections.map((s) => (
                    <Flex
                      justify="space-between"
                      style={[styles.profileBlock, openedSections.includes(s.id) && styles.activeBlock]}
                      key={s.id}>
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
                          <div {...stylex.props(text.defaultMedium)}>
                            <span>{s.label}: </span>
                            <span {...stylex.props(styles.profileValue)}>galyagalya122</span>
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
                      <div {...stylex.props(text.defaultMedium)}>
                        <span>Пароль: </span>
                        <span {...stylex.props(styles.profileValue)}>galyagalya122</span>
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
              </Stack>
            </Stack>
          </Grid.Col>
          <Grid.Col span={5}>
            <div></div>
          </Grid.Col>
        </Grid>
      </Container>
    </main>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  form: {
    width: '100%'
  },
  profileBlock: {
    backgroundColor: colors.backgroundUniversal,
    borderColor: 'transparent',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '10px 20px'
  },
  activeBlock: {
    borderColor: colors.outlinePrimaryActive,
    padding: 20
  },
  description: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10
  },
  control: {
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
