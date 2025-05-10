import { Fragment, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { Accordion, ChevronDownIcon, ChevronUpIcon, Flex, Stack, Tag, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Card } from 'components/Card';
import { KeyValue } from 'components/KeyValue';
import { ApiCreature } from 'store/_types/ApiCreature';
import { ApiSkill, ApiSkills } from 'store/_types/ApiSkills';
import { ApiSpeedStat } from 'store/_types/ApiSpeedStat';
import { ApiStat, ApiStats } from 'store/_types/ApiStats';
import { formatModifier } from 'utils/formatModifier';
import { getProficiencyBonusByCR } from 'utils/getProficiencyBonusByCR';
import { StatsTable } from './_components/StatsTable';

interface BeastCardProps {
  beast?: ApiCreature | null;

  controls?: ReactNode;

  style?: StyleXStyles;
}

const labelByStat: Record<keyof ApiStats, string> = {
  strength: 'Сила',
  dexterity: 'Ловкость',
  constitution: 'Телосложение',
  intelligence: 'Интеллект',
  wisdom: 'Мудрость',
  charisma: 'Харизма'
};

const formatSpeed = (speed?: ApiSpeedStat): string => {
  if (!speed || Object.values(speed).filter(Boolean).length === 0) {
    return 'Не указано';
  }

  const entries: string[] = [];
  const { walk, ...other } = speed;

  const translate: Record<string, string> = {
    fly: 'летая',
    swim: 'плавая',
    climb: 'лазая'
  };

  if (walk) {
    entries.push(`${walk.toString()} фт.`);
  } else {
    entries.push(`0 фт.`);
  }

  for (const [key, value] of Object.entries(other)) {
    if (value) {
      entries.push(`${translate[key] ?? key} ${value.toString()} фт.`);
    }
  }

  return entries.join(', ');
};

export const BeastCard = ({ beast, controls, style }: BeastCardProps) => {
  const biomes = beast?.biomes.map((b) => b.name);
  const languages = beast?.languages.map((l) => l.name);

  const skills = beast?.skills
    ? (Object.entries(beast.skills) as [keyof ApiSkills, Record<string, ApiSkill>][]).flatMap(([stat, skills]) =>
        Object.entries(skills)
          .filter(([, skill]) => skill?.mastery)
          .map(([, skill]) => (
            <span key={skill.name}>
              {skill.name}{' '}
              <span {...stylex.props(styles.mod)}>
                {formatModifier({
                  value: beast.stats[stat as keyof ApiStats].value,
                  mastery: true,
                  includeMastery: true,
                  challengeRating: beast.challenge_rating
                })}
              </span>
            </span>
          ))
      )
    : [];

  const savedThrows = beast?.stats
    ? (Object.entries(beast.stats) as [keyof ApiStats, ApiStat][])
        .filter(([, stats]) => stats.mastery)
        .map(([statKey, stat]) => (
          <span key={statKey}>
            {labelByStat[statKey]}{' '}
            <span {...stylex.props(styles.mod)}>
              {formatModifier({
                value: stat.value,
                mastery: true,
                includeMastery: true,
                challengeRating: beast.challenge_rating
              })}
            </span>
          </span>
        ))
    : [];

  return (
    <Card style={[styles.root, style]}>
      <Card.Header>
        <Card.Title>{beast?.name === '' ? 'Без названия' : (beast?.name ?? 'Без названия')} </Card.Title>
        {controls}
      </Card.Header>

      <Card.Body>
        <Stack gap={24}>
          <Flex gap={16}>
            <Stack gap={12} style={styles.common}>
              <div {...stylex.props(styles.personality, text.defaultMedium)}>
                {beast?.type_name ?? 'Не выбрано'}, {beast?.alignment_name ?? 'Не выбрано'} /{' '}
                {beast?.size_name ?? 'Не выбрано'}
              </div>
              <Stack gap={4}>
                <KeyValue keyLabel={'Класс доспеха:'} value={beast?.armor_class ?? 'Не указано'} />
                <KeyValue keyLabel={'Хиты:'} value={beast?.hit_points ?? 'Не указано'} />
                <KeyValue keyLabel={'Скорость:'} value={formatSpeed(beast?.speed)} />
              </Stack>
            </Stack>
          </Flex>

          <StatsTable stats={beast?.stats} />

          <Stack gap={12}>
            <KeyValue
              keyLabel={'Спасброски:'}
              value={
                savedThrows.length
                  ? savedThrows.map((s, index) => (
                      <Fragment key={s.key}>
                        {s}
                        {index + 1 !== savedThrows.length ? ', ' : ''}
                      </Fragment>
                    ))
                  : 'Не указано'
              }
            />
            <KeyValue
              keyLabel={'Навыки:'}
              value={
                skills.length
                  ? skills.map((s, index) => (
                      <Fragment key={s.key}>
                        {s}
                        {index + 1 !== skills.length && ', '}
                      </Fragment>
                    ))
                  : 'Не указано'
              }
            />
            <KeyValue keyLabel={'Где обитает:'} value={biomes?.length ? biomes.join(', ') : 'Не указано'} />
            <KeyValue keyLabel={'Языки:'} value={languages?.length ? languages.join(', ') : 'Не указано'} />
            <KeyValue
              keyLabel={'Уязвимости:'}
              value={beast?.vulnerabilities.length ? beast.vulnerabilities.map((i) => i.name).join(', ') : 'Не указано'}
            />
            <KeyValue
              keyLabel={'Сопротивления:'}
              value={beast?.resistances.length ? beast.resistances.map((i) => i.name).join(', ') : 'Не указано'}
            />
            <KeyValue
              keyLabel={'Иммунитеты:'}
              value={beast?.immunities.length ? beast.immunities.map((i) => i.name).join(', ') : 'Не указано'}
            />

            <Flex rowGap={8} gap={8}>
              <Tag>Пассивная внимательность: {beast?.senses.passive_perception ?? '-'}</Tag>
              <Tag>Уровень опасности: {beast?.challenge_rating ?? '-'}</Tag>
              <Tag>БМ: {getProficiencyBonusByCR(beast?.challenge_rating)}</Tag>
            </Flex>
          </Stack>
        </Stack>

        <Accordion>
          <Accordion.Item style={styles.description} value="description">
            <Accordion.Control style={[styles.control, text.subheaderSemibold]}>
              {(open: boolean) => (
                <Fragment>
                  Описание
                  {open ? (
                    <ChevronUpIcon {...stylex.props(styles.chevron)} />
                  ) : (
                    <ChevronDownIcon {...stylex.props(styles.chevron)} />
                  )}
                </Fragment>
              )}
            </Accordion.Control>
            <Accordion.Panel>
              <div {...stylex.props(styles.panel, text.defaultRegular)}>
                {beast?.description === '' ? 'Не указано' : (beast?.description ?? 'Не указано')}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Stack gap={16}>
          <h5 {...stylex.props(text.subheaderSemibold)}>Особенности</h5>
          <ul {...stylex.props(styles.list)}>
            {beast?.traits.length ? (
              beast.traits.map((t) => (
                <li {...stylex.props(styles.card, styles.trait)} key={t.id}>
                  <KeyValue keyLabel={t.name + ':'} value={t.description.replaceAll('{name}', beast.name)} />
                </li>
              ))
            ) : (
              <li {...stylex.props(styles.card, styles.trait, text.defaultSemibold)}>-</li>
            )}
          </ul>
        </Stack>

        <Stack gap={16}>
          <h5 {...stylex.props(text.subheaderSemibold)}>Действия</h5>
          <ul {...stylex.props(styles.list)}>
            {beast?.actions.length ? (
              beast.actions.map((a) => (
                <li {...stylex.props(styles.card, styles.action)} key={a.id}>
                  <KeyValue keyLabel={a.name + ':'} value={a.description.replaceAll('{name}', beast.name)} />
                </li>
              ))
            ) : (
              <li {...stylex.props(styles.card, styles.action, text.defaultSemibold)}>-</li>
            )}
          </ul>
        </Stack>
      </Card.Body>
    </Card>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  common: {
    flex: '1'
  },
  personality: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutralDefault,
    borderRadius: 10,
    color: colors.textSecondaryDefault,
    display: 'flex',
    gap: 4,
    padding: 8
  },
  description: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10
  },
  control: {
    color: colors.textPrimaryDefault,
    padding: 16
  },
  chevron: {
    color: colors.brand90
  },
  panel: {
    paddingBottom: 16,
    paddingInline: 16
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  card: {
    backgroundColor: colors.backgroundUniversal,
    borderLeftStyle: 'solid',
    borderLeftWidth: 4,
    borderRadius: 6,
    padding: '8px 12px',
    width: '100%'
  },
  trait: {
    borderLeftColor: colors.brand80
  },
  action: {
    borderLeftColor: colors.textTertiaryDefault
  },
  mod: {
    color: colors.brand80
  }
});
