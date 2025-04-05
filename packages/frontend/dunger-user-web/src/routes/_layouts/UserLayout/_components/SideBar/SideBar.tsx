import { useEffect, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import {
  BellFilledIcon,
  Button,
  ButtonVariant,
  ButtonWidth,
  DiceD20Icon,
  IconButton,
  IconButtonVariant,
  LogoSmall,
  MenuIcon,
  PlusFilledIcon,
  Stack,
  text,
  XIcon
} from '@dunger/ui';
import { ModalFooter } from '../ModalFooter';
import { Tab } from '../Tab';

export const SideBar = () => {
  const [open, setOpen] = useState(false);
  //const [isAuthenticated] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!open) return;

      const target = e.target as Node | null;

      if (!target?.isConnected) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        setOpen(false);
      }
    };

    let active = true;
    setTimeout(() => {
      if (active) {
        window.addEventListener('click', handleClick);
      }
    }, 0);

    return () => {
      active = false;
      window.removeEventListener('click', handleClick);
    };
  }, [open, setOpen]);

  return (
    <aside ref={ref}>
      <div {...stylex.props(styles.root)}>
        <Stack align="center" gap={40}>
          <Link to={'/'}>
            <LogoSmall />
          </Link>
          <Stack gap={16}>
            <IconButton
              aria-selected={open}
              variant={IconButtonVariant.ghost}
              onClick={() => {
                setOpen((prev) => !prev);
              }}>
              {open ? <XIcon /> : <MenuIcon />}
            </IconButton>
            <IconButton variant={IconButtonVariant.ghost}>
              <BellFilledIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack gap={16}>
          <Link to={'/beast/new'}>
            <IconButton>
              <PlusFilledIcon />
            </IconButton>
          </Link>

          <IconButton>
            <DiceD20Icon />
          </IconButton>

          <ModalFooter />
        </Stack>
      </div>

      {open && (
        <nav {...stylex.props(styles.nav)}>
          <Stack gap={20}>
            <div {...stylex.props(styles.header)}>
              <Button width={ButtonWidth.full} variant={ButtonVariant.accent}>
                Войти
              </Button>
            </div>
            <Stack gap={24}>
              <section {...stylex.props(styles.section)}>
                <div {...stylex.props(text.subheaderBold, styles.sectionTitle)}>Игровой персонаж</div>
                <Tab to={'species'}>Расы</Tab>
                <Tab to={'classes'}>Классы </Tab>
                <Tab to={'feats'}>Черты</Tab>
                <Tab to={'backgrounds'}>Предыстории</Tab>
              </section>
              <section {...stylex.props(styles.section)}>
                <div {...stylex.props(text.subheaderBold, styles.sectionTitle)}>Для мастера</div>
                <Tab to={'bestiary'}>Бестиарий</Tab>
              </section>
            </Stack>
          </Stack>
        </nav>
      )}
    </aside>
  );
};

const styles = stylex.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRightColor: '#EAEAEA',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100dvh',
    justifyContent: 'space-between',
    left: 0,
    padding: '20px 16px',
    position: 'sticky',
    top: 0,
    zIndex: 0
  },
  nav: {
    background: 'white',
    borderRightColor: '#EAEAEA',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    height: '100dvh',
    left: 77,
    position: 'fixed',
    top: 0,
    width: 339,
    zIndex: 10
  },
  header: {
    borderBottomColor: '#EAEAEA',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    padding: 20
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  sectionTitle: {
    padding: '14px 24px'
  }
});
