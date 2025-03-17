import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Button,
  headers,
  IconButton,
  IconButtonVariant,
  PlusFilledIcon,
  SearchIcon,
  Sheet,
  Stack,
  text,
  TextInput,
  XIcon
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { getWordForm } from 'utils/getWordForm';

export const ActionsSection = () => {
  const totalCount = 120;

  return (
    <Fragment>
      <Sheet>
        <Sheet.Trigger asChild>
          <Button>
            Добавить действия <PlusFilledIcon {...stylex.props(styles.icon)} />
          </Button>
        </Sheet.Trigger>
        <Sheet.Content style={styles.root}>
          <Sheet.Header>
            <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Действия</h3>
            <Sheet.Close asChild>
              <IconButton size="sm" variant={IconButtonVariant.ghost}>
                <XIcon />
              </IconButton>
            </Sheet.Close>
          </Sheet.Header>
          <Stack style={styles.body} gap={24}>
            <Stack gap={16}>
              <TextInput placeholder="Начните вводить" leftSection={<SearchIcon />} />
              <div {...stylex.props(styles.count, text.smallSemibold)}>
                Найдено: {totalCount} {getWordForm(totalCount, ['действие', 'действия', 'действий'])}
              </div>
            </Stack>
          </Stack>
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
  },
  count: {
    color: colors.textTertiaryDefault
  }
});
