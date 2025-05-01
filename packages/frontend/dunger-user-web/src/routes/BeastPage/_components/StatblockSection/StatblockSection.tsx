import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Checkbox, Flex, Grid, MultiSelect, NumberInput, Select, Stack, text, TextInput } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiStats } from 'store/_types/ApiStats';
import { useDirectoryOptions } from '../../useDirectoryOptions';
import { AddSkills } from '../AddSkills';
import { SectionProps } from '../BeastForm/BeastForm';

const labelByStat: Record<keyof ApiStats, string> = {
  strength: 'CИЛ',
  dexterity: 'ЛОВ',
  constitution: 'ТЕЛ',
  intelligence: 'ИНТ',
  wisdom: 'МДР',
  charisma: 'ХАР'
};

export const StatblockSection = ({ formState, handleFieldChange }: SectionProps) => {
  const { crOptions, damageTypeOptions } = useDirectoryOptions();

  return (
    <Fragment>
      <Stack style={styles.root} gap={24}>
        <Flex gap={8}>
          <TextInput
            value={formState.hit_points ?? ''}
            onChange={(e) => {
              handleFieldChange(e.target.value, 'hit_points');
            }}
            name="hit_points"
            label="Количество хитов"
            placeholder="Введите кол-во хитов"
          />
          <Select
            value={formState.challenge_rating}
            onChange={(e) => {
              handleFieldChange(e, 'challenge_rating');
            }}
            name="challenge_rating"
            options={crOptions}
            label="Класс Опасности (CR)"
            placeholder="- Не выбрано -"
          />
        </Flex>
        <div {...stylex.props(text.smallMedium, styles.description)}>
          Укажите характеристики, а также выберите владение спасбросками
        </div>
        <Grid columns={6} gap={8}>
          {Object.keys(formState.stats).map((s) => (
            <Grid.Col key={s} style={styles.stat}>
              <NumberInput
                value={formState.stats[s as keyof ApiStats].value ?? ''}
                onChange={(e) => {
                  handleFieldChange(e, `stats.${s}.value`);
                }}
                name={s}
                label={labelByStat[s as keyof ApiStats]}
                placeholder="8"
                min={1}
                max={30}
              />
              <Checkbox
                checked={formState.stats[s as keyof ApiStats].mastery}
                onCheckedChange={(e) => {
                  handleFieldChange(e, `stats.${s}.mastery`);
                }}
                name={`${s}_mastery`}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Select disabled placeholder="- Не выбрано -" label="Тип брони" />
      <AddSkills
        handleFieldChange={handleFieldChange}
        challenge_rating={formState.challenge_rating}
        stats={formState.stats}
        skills={formState.skills}
      />
      <MultiSelect
        options={damageTypeOptions}
        value={formState.vulnerabilities_ids}
        onChange={(ids) => {
          handleFieldChange(ids, 'vulnerabilities_ids');
        }}
        name="vulnerabilities_ids"
        placeholder="- Не выбрано -"
        label="Уязвимость к видам урону"
      />
      <MultiSelect
        options={damageTypeOptions}
        value={formState.resistances_ids}
        onChange={(ids) => {
          handleFieldChange(ids, 'resistances_ids');
        }}
        name="resistances_ids"
        placeholder="- Не выбрано -"
        label="Сопротивление к видам урону"
      />
      <MultiSelect
        options={damageTypeOptions}
        value={formState.immunities_ids}
        onChange={(ids) => {
          handleFieldChange(ids, 'immunities_ids');
        }}
        name="immunities_ids"
        placeholder="- Не выбрано -"
        label="Иммунитет к видам урону"
      />
    </Fragment>
  );
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 16,
    padding: 16
  },
  stat: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  description: {
    color: colors.textTertiaryDefault
  },
  icon: {
    height: 16,
    width: 16
  }
});
