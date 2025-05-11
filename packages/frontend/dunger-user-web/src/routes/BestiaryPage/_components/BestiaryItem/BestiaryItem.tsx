import * as stylex from '@stylexjs/stylex';
import { Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiCreature } from 'store/_types/ApiCreature';

interface BestiaryItemProps extends Pick<ApiCreature, 'name' | 'challenge_rating' | 'type_name' | 'alignment_name'> {
  active: boolean;
}

export const BestiaryItem = ({ name, challenge_rating, type_name, alignment_name, active }: BestiaryItemProps) => {
  return (
    <Stack aria-selected={active} style={styles.root} gap={4}>
      <div {...stylex.props(text.defaultSemibold)}>{name}</div>
      <Flex gap={5}>
        <div {...stylex.props(text.defaultSemibold)}>{challenge_rating},</div>
        <div {...stylex.props(text.defaultMedium)}>
          {type_name ?? 'тип не выбран'}, {alignment_name ?? 'мировозрение не выбрано'}
        </div>
      </Flex>
    </Stack>
  );
};

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: 'transparent',
      ':is([aria-selected=true])': 'transparent'
    },
    borderRadius: 10,
    boxShadow: {
      default: 'none',
      ':hover': '0 4px 4px -4px #0C0C0D0D, 0 16px 32px -4px #0C0C0D1A'
    },
    outlineColor: {
      default: colors.outlinePrimaryDefault,
      ':is([aria-selected=true])': colors.outlinePrimaryActive,
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
