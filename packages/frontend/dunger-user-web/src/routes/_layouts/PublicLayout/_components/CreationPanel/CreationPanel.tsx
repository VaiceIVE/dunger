import { useEffect, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { CatIcon, FolderIcon, IconButton, MoneybagIcon, PlusFilledIcon, TreesIcon, UserIcon } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { AddAdventure } from 'features/_entity/AddAdventure';
import { AddLocation } from 'features/_entity/AddLocation';
import { AddMagicItem } from 'features/_entity/AddMagicItem';
import { Tab } from '../Tab';

interface CreationPanelProps {
  isAuthenticated: boolean;
}

export const CreationPanel = ({ isAuthenticated }: CreationPanelProps) => {
  const [open, setOpen] = useState(false);

  const [createdEntity, setCreatedEntity] = useState<'adventure' | 'magicItem' | 'location' | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!open) return;

      const target = e.target as Node | null;

      if (!target?.isConnected) {
        setOpen(false);
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

  if (!isAuthenticated)
    return (
      <Link to={'/no-auth'}>
        <IconButton>
          <PlusFilledIcon />
        </IconButton>
      </Link>
    );

  return (
    <div {...stylex.props(styles.root)}>
      <IconButton
        aria-selected={open}
        onClick={() => {
          setOpen((prev) => !prev);
        }}>
        <PlusFilledIcon />
      </IconButton>

      <AddAdventure
        open={createdEntity === 'adventure'}
        setOpen={(open) => {
          if (!open) setCreatedEntity(null);
        }}
      />

      <AddMagicItem
        open={createdEntity === 'magicItem'}
        setOpen={(open) => {
          if (!open) setCreatedEntity(null);
        }}
      />

      <AddLocation
        open={createdEntity === 'location'}
        setOpen={(open) => {
          if (!open) setCreatedEntity(null);
        }}
      />

      {open && (
        <nav
          onClick={() => {
            setOpen(false);
          }}
          ref={ref}
          {...stylex.props(styles.nav)}>
          <Tab to={'/beast/new'}>
            Создать существо <CatIcon />
          </Tab>
          <Tab disabled to={'classes'}>
            Создать игрового персонажа <UserIcon />
          </Tab>
          <Tab
            onClick={() => {
              setCreatedEntity('magicItem');
            }}>
            Создать предмет <MoneybagIcon />
          </Tab>
          <Tab
            onClick={() => {
              setCreatedEntity('location');
            }}>
            Создать локацию <TreesIcon />
          </Tab>
          <Tab
            onClick={() => {
              setCreatedEntity('adventure');
            }}>
            Создать приключение <FolderIcon />
          </Tab>
        </nav>
      )}
    </div>
  );
};

const styles = stylex.create({
  root: {
    position: 'relative'
  },
  nav: {
    backgroundColor: 'white',
    borderColor: colors.outlineAccentDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: '0px 4px 24px 0px #00000014',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    left: 74,
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 350,
    zIndex: 4000
  }
});
