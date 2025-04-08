import * as stylex from '@stylexjs/stylex';
import { Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const ListItem = () => {
  return (
    <Stack aria-selected={false} style={styles.root} gap={4}>
      <div {...stylex.props(text.defaultSemibold)}>Монстр</div>
      <Flex gap={5}>
        <div {...stylex.props(text.defaultSemibold)}>1/8,</div>
        <div {...stylex.props(text.defaultMedium)}>Гуманоид (эльф), Зак.-Злой</div>
      </Flex>
    </Stack>
  );
};

const styles = stylex.create({
  root: {
    borderRadius: 10,
    boxShadow: {
      default: 'none',
      ':hover': '0 4px 4px -4px #0C0C0D0D, 0 16px 32px -4px #0C0C0D1A'
    },
    outlineColor: {
      default: colors.outlinePrimaryDefault,
      ':hover': colors.outlinePrimaryHover
    },
    outlineStyle: 'solid',
    outlineWidth: {
      default: '1px',
      ':is([aria-selected=true])': '2px'
    },
    padding: '12px 14px',
    transition: 'all 0.2s'
  }
});
