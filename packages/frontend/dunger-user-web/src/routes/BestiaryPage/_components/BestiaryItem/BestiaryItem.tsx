import * as stylex from '@stylexjs/stylex';
import { Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiCreature } from 'store/_types/ApiCreature';

export const BestiaryItem = ({
  name,
  challenge_rating,
  type_name,
  alignment_name
}: Pick<ApiCreature, 'name' | 'challenge_rating' | 'type_name' | 'alignment_name'>) => {
  return (
    <Stack aria-selected={false} style={styles.root} gap={4}>
      <div {...stylex.props(text.defaultSemibold)}>{name}</div>
      <Flex gap={5}>
        <div {...stylex.props(text.defaultSemibold)}>{challenge_rating},</div>
        <div {...stylex.props(text.defaultMedium)}>
          {type_name}, {alignment_name}
        </div>
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
