import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, PlusFilledIcon } from '@dunger/ui';

export const SkillsSection = () => {
  return (
    <Fragment>
      <Button>
        Добавить навыки <PlusFilledIcon {...stylex.props(styles.icon)} />
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
