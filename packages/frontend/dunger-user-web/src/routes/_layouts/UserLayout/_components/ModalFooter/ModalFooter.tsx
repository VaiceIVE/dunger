import * as stylex from '@stylexjs/stylex';
import { Flex, IconButton, LogoSmall, Modal, QuestionIcon, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const ModalFooter = () => {
  return (
    <Modal>
      <Modal.Target>
        <IconButton>
          <QuestionIcon />
        </IconButton>
      </Modal.Target>

      <Modal.Content>
        <Stack style={styles.root} gap={24}>
          <Stack gap={10}>
            <Flex align="flex-start" gap={8}>
              <LogoSmall />
              <div {...stylex.props(text.defaultSemibold)}>
                Dunger <br /> by <span {...stylex.props(styles.adera)}>@Adera</span>
              </div>
            </Flex>
            <div {...stylex.props(text.defaultMedium, styles.description)}>
              Помогаем создавать опасно увлекательные приключения
            </div>
          </Stack>
          <Flex style={styles.contacts} gap={0}>
            <div {...stylex.props(styles.contact, text.defaultMedium)}>
              почта: <br />
              <a {...stylex.props(styles.link)} href={'mailto:adera_tech@gmail.com'}>
                adera_tech@gmail.com
              </a>
            </div>
            <div {...stylex.props(styles.contact, text.defaultMedium)}>
              тгк: <br />
              <a {...stylex.props(styles.link)} href={'https://t.me/aderaweb'} target="_blank" rel={'noreferrer'}>
                @adera_tech
              </a>
            </div>
          </Flex>
        </Stack>
      </Modal.Content>
    </Modal>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  adera: {
    color: colors.brand80
  },
  description: {
    color: colors.textTertiaryDefault
  },
  contacts: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1
  },
  contact: {
    borderLeftColor: { default: 'transparent', ':last-child': colors.outlinePrimaryDefault },
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    flex: '1',
    padding: 12
  },
  link: {
    color: colors.brand80,
    textDecoration: 'underline'
  }
});
