import * as stylex from '@stylexjs/stylex';
import { Flex, Tag, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

interface MagicItemProps {
  name: string;
}
export const MagicItem = ({ name }: MagicItemProps) => {
  return (
    <Flex aria-selected={false} style={styles.root} gap={4}>
      <div {...stylex.props(text.defaultSemibold)}>{name}</div> <Tag color="yellow">{'40 З.М'}</Tag>
    </Flex>
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
