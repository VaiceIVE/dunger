import * as stylex from '@stylexjs/stylex';
import { Stack } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const BestiaryCard = () => {
  return <Stack style={styles.root} gap={32}></Stack>;
};

const styles = stylex.create({
  root: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    height: 'calc(100dvh - 64px)',
    position: 'relative'
  }
});
