import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, PlusFilledIcon } from '@dunger/ui';

export const ActionsSection = () => {
  return (
    <Fragment>
      <Button>
        Добавить действия <PlusFilledIcon {...stylex.props(styles.icon)} />
      </Button>
    </Fragment>
  );
};

const styles = stylex.create({
  icon: {
    height: 16,
    width: 16
  }
});
