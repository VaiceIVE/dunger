import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  BookmarkIcon,
  Button,
  ButtonVariant,
  ButtonWidth,
  headers,
  IconButton,
  IconButtonVariant,
  PlusIcon,
  Sheet,
  Stack,
  XIcon
} from '@dunger/ui';
import { useAddAction } from './useAddAction';

export const AddToCampaign = () => {
  const [campaignIds, setCampaignIds] = useState<string[]>([]);

  const { addAction } = useAddAction();

  const handleClick = (id: string) => {
    setCampaignIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  return (
    <Sheet>
      <Sheet.Trigger asChild>
        <IconButton size="sm">
          <BookmarkIcon />
        </IconButton>
      </Sheet.Trigger>

      <Sheet.Content style={styles.root}>
        <Sheet.Header>
          <h3 {...stylex.props(headers.h3Semibold, styles.title)}>Добавить в бестиарий кампании</h3>
          <Sheet.Close asChild>
            <IconButton size="sm" variant={IconButtonVariant.ghost}>
              <XIcon />
            </IconButton>
          </Sheet.Close>
        </Sheet.Header>

        <form {...stylex.props(styles.form)} action={addAction}>
          <input type="hidden" name="campaignIds" value={campaignIds.join(',')} />

          <Stack style={styles.list} gap={120}>
            <div {...stylex.props(styles.card)}>
              <IconButton
                type="button"
                onClick={() => {
                  handleClick('id');
                }}>
                <PlusIcon />
              </IconButton>
            </div>
          </Stack>

          <Sheet.Footer style={styles.footer}>
            <Button type="submit" width={ButtonWidth.full}>
              Добавить
            </Button>
            <Button
              onClick={() => {
                setCampaignIds([]);
              }}
              type="button"
              width={ButtonWidth.full}
              variant={ButtonVariant.ghost}>
              Сбросить выбор
            </Button>
          </Sheet.Footer>
        </form>
      </Sheet.Content>
    </Sheet>
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
  form: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    gap: 0
  },
  list: {
    flex: '1',
    padding: '0 24px',
    position: 'relative'
  },
  card: {
    alignItems: 'center',
    display: 'flex',
    gap: 16
  },
  footer: {
    display: 'flex',
    gap: 8
  }
});
