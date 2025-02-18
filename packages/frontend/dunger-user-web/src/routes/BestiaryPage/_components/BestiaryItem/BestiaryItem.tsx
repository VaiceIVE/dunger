import * as stylex from '@stylexjs/stylex';
import { Flex, Stack } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const BestiaryItem = () => {
  return (
    <Stack style={styles.root} gap={4}>
      <div>Монстр</div>
      <Flex gap={5}>
        <div>1/8,</div>
        <div>Гуманоид (эльф), Зак.-Злой</div>
      </Flex>
    </Stack>
  );
};

const styles = stylex.create({
  root: {
    borderColor: {
      default: colors.outlinePrimaryDefault,
      ':hover': colors.outlinePrimaryHover
    },
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: '12px 14px',
    transition: 'all 0.2s'
  }
});
