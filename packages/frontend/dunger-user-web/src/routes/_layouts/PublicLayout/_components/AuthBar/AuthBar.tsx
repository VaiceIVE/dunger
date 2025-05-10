import * as stylex from '@stylexjs/stylex';
import { useAuth } from '@dunger/auth-fetch';
import {
  Accordion,
  Flex,
  Tag,
  IconButton,
  ChevronUpIcon,
  ChevronDownIcon,
  Stack,
  ProgressBar,
  ProgressBarVariant,
  AiFillIcon,
  text,
  LogoutIcon,
  IconButtonVariant,
  Avatar
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { useUser } from 'store/user';
import { Tab } from '../Tab';

export const AuthBar = () => {
  const { logout } = useAuth();
  const user = useUser();

  return (
    <Accordion>
      <Accordion.Item value="main">
        <Accordion.Control style={styles.control}>
          {(open: boolean) => (
            <Flex style={styles.root} align="center" justify="space-between" wrap="nowrap">
              {!!user && (
                <Flex style={styles.header} align="center" wrap="nowrap" gap={16}>
                  <Avatar size="sm" />
                  <Tag>{user.username}</Tag>
                </Flex>
              )}
              <IconButton variant={IconButtonVariant.ghost} aria-selected={open} size="sm">
                {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </IconButton>
            </Flex>
          )}
        </Accordion.Control>
        <Accordion.Panel>
          <Stack gap={16} style={styles.panel}>
            <div {...stylex.props(styles.widget)}>
              <Flex style={styles.card} gap={10} wrap="nowrap" align="center">
                <div {...stylex.props(styles.ai)}>
                  <AiFillIcon {...stylex.props(styles.icon)} />
                </div>
                <ProgressBar
                  style={styles.bar}
                  title="Генерации"
                  description="использовано"
                  variant={ProgressBarVariant.secondary}
                  value={0}
                  max={25}
                />
              </Flex>
            </div>
            <Stack gap={0}>
              <Tab to={'/3'}>Мои персонажи</Tab>
              <Tab to={'/2'}>Мой бестиарий</Tab>
              <Tab to={'/adventures'}>Мои кампании</Tab>
              <Tab to={'/profile'}>Мой профиль</Tab>
            </Stack>
            <div {...stylex.props(styles.button, text.defaultSemibold)} onClick={logout}>
              <LogoutIcon {...stylex.props(styles.logoutIcon)} /> Выйти
            </div>
          </Stack>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

const styles = stylex.create({
  root: {
    width: '100%'
  },
  header: {
    overflow: 'hidden'
  },
  control: {
    padding: '20px 20px 0'
  },
  panel: {
    paddingTop: 16
  },
  widget: {
    paddingInline: 16
  },
  ai: {
    alignItems: 'center',
    backgroundColor: colors.backgroundBlueDefault,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    padding: 8
  },
  icon: {
    color: colors.blue60,
    height: 14,
    width: 14
  },
  bar: {
    flex: '1'
  },
  card: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 12
  },
  button: {
    alignItems: 'center',
    backgroundColor: {
      default: 'transparent',
      ':is(:hover):not(:disabled, .active)': colors.backgroundUniversal,
      ':is(.active)': colors.backgroundOrangeDefault,
      ':disabled': colors.backgroundNeutralDefault
    },
    borderRadius: 0,
    color: {
      default: colors.textPrimaryDefault,
      ':is(:hover):not(:disabled, .active)': colors.textPrimaryHover,
      ':is(.active)': colors.brand80,
      ':disabled': colors.black30
    },
    cursor: 'pointer',
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-start',
    padding: '12px 24px',
    transition: 'all 0.2s',
    width: '100%'
  },
  logoutIcon: {
    color: colors.textTertiaryDefault,
    height: 16,
    width: 16
  }
});
