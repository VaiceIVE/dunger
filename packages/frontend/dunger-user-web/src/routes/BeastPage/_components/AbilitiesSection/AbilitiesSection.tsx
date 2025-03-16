import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Button, headers, IconButton, IconButtonVariant, PlusFilledIcon, Sheet, Stack, XIcon } from '@dunger/ui';

export const AbilitiesSection = () => {
  return (
    <Fragment>
      <Sheet>
        <Sheet.Trigger asChild>
          <Button>
            Добавить способности <PlusFilledIcon {...stylex.props(styles.icon)} />
          </Button>
        </Sheet.Trigger>
        <Sheet.Content style={styles.root}>
          <Sheet.Header>
            <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Способности</h3>
            <Sheet.Close asChild>
              <IconButton size="sm" variant={IconButtonVariant.ghost}>
                <XIcon />
              </IconButton>
            </Sheet.Close>
          </Sheet.Header>
          <Stack style={styles.body} gap={16}></Stack>
        </Sheet.Content>
      </Sheet>
    </Fragment>
  );
};

const styles = stylex.create({
  root: {
    height: '100%',
    overflowY: 'scroll',
    scrollbarGutter: 'stable',
    '::-webkit-scrollbar': {
      background: 'transparent',
      display: 'none',
      height: 0,
      width: 0
    }
  },
  title: {
    flex: '1'
  },
  body: {
    flex: '1',
    padding: '0 24px 24px'
  },
  icon: {
    height: 16,
    width: 16
  }
});
