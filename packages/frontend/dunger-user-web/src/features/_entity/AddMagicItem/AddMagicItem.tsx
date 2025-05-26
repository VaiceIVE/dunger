import * as stylex from '@stylexjs/stylex';
import { Modal, headers, TextInput, Button, ButtonVariant, Flex } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { useAddMagicItemAction } from './useAddMagicItemAction';

interface AddMagicItemProps {
  open?: boolean;

  setOpen?: (open: boolean) => void;
}

export const AddMagicItem = ({ open, setOpen }: AddMagicItemProps) => {
  const { action } = useAddMagicItemAction({
    onSuccess: () => {
      setOpen?.(false);
    }
  });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content>
        <form action={action} {...stylex.props(styles.content)}>
          <h2 {...stylex.props(headers.h3Bold)}>Новый магический предмет</h2>
          <TextInput required label="Название" placeholder="Например, Меч тысячи истин" name="name" />
          <Flex gap={8}>
            <Button type="submit" variant={ButtonVariant.accent}>
              Создать
            </Button>
            <Button
              type="button"
              onClick={() => {
                setOpen?.(false);
              }}
              variant={ButtonVariant.ghost}>
              Отмена
            </Button>
          </Flex>
        </form>
      </Modal.Content>
    </Modal>
  );
};

const styles = stylex.create({
  content: {
    color: colors.textPrimaryDefault,
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }
});
