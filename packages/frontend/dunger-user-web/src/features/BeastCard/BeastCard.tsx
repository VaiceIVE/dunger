import { Fragment, ReactNode, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Accordion, Avatar, ChevronDownIcon, ChevronUpIcon, Flex, Stack, Tag, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Card } from 'components/Card';
import { Beast } from 'store/apiTypes.gen';
import { StatsTable } from './_components/StatsTable';

interface BeastCardProps {
  beast?: Beast;
  controls?: ReactNode;
}

export const BeastCard = ({ beast, controls }: BeastCardProps) => {
  const [openedSection, setOpenedSection] = useState('');

  return (
    <Card style={styles.root}>
      <Card.Header>
        <Card.Title>{beast?.name ?? 'Без названия'} </Card.Title>
        {controls}
      </Card.Header>

      <Card.Body>
        <Stack gap={24}>
          <Flex gap={16}>
            <Stack gap={12} style={styles.common}>
              <div {...stylex.props(styles.personality, text.defaultMedium)}>
                <div>
                  {beast?.type ?? 'Не выбрано'}, {beast?.alignment ?? 'Не выбрано'}
                </div>
                <div>/ {beast?.size ?? 'Не выбрано'}</div>
              </div>
              <Stack gap={4}>
                <KeyValue keyLabel={'Класс доспеха:'} value={beast?.armorClass ?? 'Не указано'} />
                <KeyValue keyLabel={'Хиты:'} value={beast?.hitPoints ?? 'Не указано'} />
                <KeyValue keyLabel={'Скорость:'} value={beast?.speed.walk ?? 'Не указано'} />
              </Stack>
            </Stack>
            <Avatar size={120} src={beast?.imageUrl} />
          </Flex>

          <StatsTable />

          <Stack gap={12}>
            <KeyValue keyLabel={'Навыки:'} value={beast?.biom.join(', ') ?? 'Не указано'} />
            <KeyValue keyLabel={'Где обитает:'} value={beast?.biom.join(', ') ?? 'Не указано'} />
            <KeyValue keyLabel={'Языки:'} value={beast?.languages?.join(', ') ?? 'Не указано'} />

            <Flex gap={8}>
              <Tag>пассивная Внимательность: -</Tag>
              <Tag>Уровень опасности: -</Tag>
              <Tag>БМ: -</Tag>
            </Flex>
          </Stack>
        </Stack>

        <Accordion
          onChange={(value) => {
            setOpenedSection(value as string);
          }}
          value={openedSection}>
          <Accordion.Item style={styles.description} value="description">
            <Accordion.Control style={[styles.control, text.subheaderSemibold]}>
              {(open: boolean) => (
                <Fragment>
                  Описание{' '}
                  {open ? (
                    <ChevronUpIcon {...stylex.props(styles.chevron)} />
                  ) : (
                    <ChevronDownIcon {...stylex.props(styles.chevron)} />
                  )}
                </Fragment>
              )}
            </Accordion.Control>
            <Accordion.Panel>
              <div {...stylex.props(styles.panel, text.defaultRegular)}>{beast?.description ?? 'Не указано'}</div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Stack gap={16}>
          <h5 {...stylex.props(text.subheaderSemibold)}>Особенности</h5>
          <ul {...stylex.props(styles.list)}>
            {beast?.traits?.length ? (
              beast.traits.map((t) => (
                <li {...stylex.props(styles.card, styles.trait)} key={t.name}>
                  <KeyValue keyLabel={t.name} value={t.description} />
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
            {beast?.actions?.length ? (
              beast.actions.map((a) => (
                <li {...stylex.props(styles.card, styles.action)} key={a.name}>
                  <KeyValue keyLabel={a.name} value={a.description} />
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

const KeyValue = ({ keyLabel, value }: { keyLabel?: ReactNode; value?: ReactNode }) => {
  return (
    <Flex gap={6} style={text.defaultMedium}>
      <div {...stylex.props(styles.key, text.defaultSemibold)}>{keyLabel}</div>
      <div {...stylex.props(styles.value)}>{value}</div>
    </Flex>
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
  key: {
    color: colors.textPrimaryDefault
  },
  value: {
    color: colors.textSecondaryDefault
  },
  description: {
    backgroundColor: '#F6F6F7',
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
    backgroundColor: '#F6F6F7',
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
  }
});
