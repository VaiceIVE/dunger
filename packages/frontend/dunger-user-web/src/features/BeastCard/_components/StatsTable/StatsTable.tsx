import * as stylex from '@stylexjs/stylex';
import { Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiStats } from 'store/_types/ApiStats';
import { getAbilityModifier } from 'utils/getAbilityModifier';

const statsMap: { title: string; key: keyof ApiStats }[] = [
  {
    title: 'CИЛ',
    key: 'strength'
  },
  {
    title: 'ЛОВ',
    key: 'dexterity'
  },
  {
    title: 'ТЕЛ',
    key: 'constitution'
  },
  {
    title: 'ИНТ',
    key: 'intelligence'
  },
  {
    title: 'МДР',
    key: 'wisdom'
  },
  {
    title: 'ХАР',
    key: 'charisma'
  }
];

export const StatsTable = ({ stats }: { stats?: ApiStats }) => {
  if (!stats) return;

  return (
    <Flex gap={0}>
      {statsMap.map((s) => (
        <Stack style={[styles.root, text.defaultSemibold]} key={s.key} gap={0}>
          <div {...stylex.props(styles.title)}>{s.title}</div>
          <div {...stylex.props(styles.value)}>
            {(() => {
              const value = stats[s.key].value;
              if (!value || value.toString() === '') return '-';

              const _value = value > 30 ? 30 : value < 1 ? 1 : value;
              const mod = getAbilityModifier(value);

              return `${_value.toString()} (${mod > 0 ? '+' : ''}${getAbilityModifier(_value).toString()})`;
            })()}
          </div>
        </Stack>
      ))}
    </Flex>
  );
};

const styles = stylex.create({
  root: {
    borderBottomWidth: 2,
    borderColor: colors.outlinePrimaryDefault,
    borderLeftWidth: { default: 1, ':first-child': 2 },
    borderRadius: { default: 0, ':first-child': '10px 0 0 10px', ':last-child': '0 10px 10px 0' },
    borderRightWidth: { default: 1, ':last-child': 2 },
    borderStyle: 'solid',
    borderTopWidth: 2,
    flex: '1'
  },
  title: {
    alignItems: 'center',
    color: colors.textTertiaryDefault,
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: 4
  },
  value: {
    alignItems: 'center',
    borderTopColor: colors.outlinePrimaryDefault,
    borderTopStyle: 'solid',
    borderTopWidth: 2,
    color: colors.brand80,
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: 4
  }
});
