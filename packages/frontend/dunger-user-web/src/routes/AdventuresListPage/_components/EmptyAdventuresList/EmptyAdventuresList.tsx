import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Stack, headers, Button, ButtonVariant, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import banner from '../../_images/banner.png';

interface EmptyAdventuresListProps {
  setOpen: (open: boolean) => void;
}

export const EmptyAdventuresList = ({ setOpen }: EmptyAdventuresListProps) => {
  return (
    <Fragment>
      <div {...stylex.props(styles.banner)}>
        <Stack gap={8}>
          <h3 {...stylex.props(headers.h3Bold)}>Здесь начинается твой путь!</h3>
          <div {...stylex.props(text.defaultMedium)}>
            Создай свое первое приключения, планируй партии и все, что будет происходить в них. <br /> Теперь
            приключение можно построить буквально из кирпичиков, избегая всю рутину!
          </div>
        </Stack>
        <Button
          onClick={() => {
            setOpen(true);
          }}
          variant={ButtonVariant.secondary}>
          Создать приключение
        </Button>
        <img src={banner} {...stylex.props(styles.bannerBg)} />
      </div>
    </Fragment>
  );
};

const styles = stylex.create({
  banner: {
    alignItems: 'flex-end',
    borderRadius: 12,
    color: 'white',
    display: 'flex',
    gap: 20,
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: 24,
    position: 'relative'
  },
  bannerBg: {
    backgroundColor: colors.brand90,
    height: '100%',
    left: 0,
    objectFit: 'fill',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1
  }
});
