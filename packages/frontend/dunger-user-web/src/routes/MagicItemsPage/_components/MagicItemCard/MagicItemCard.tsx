import { Fragment, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { Accordion, ChevronDownIcon, ChevronUpIcon, Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Card } from 'components/Card';
import { ApiMagicItem } from 'store/_types/magic-item/ApiMagicItem';

interface magicItemCardProps {
  magicItem?: ApiMagicItem | null;

  controls?: ReactNode;

  style?: StyleXStyles;
}

export const MagicItemCard = ({ magicItem, controls, style }: magicItemCardProps) => {
  return (
    <Card style={[styles.root, style]}>
      <Card.Header>
        <Card.Title>{magicItem?.name ?? 'Без названия'} </Card.Title>
        {controls}
      </Card.Header>

      <Card.Body>
        <Stack gap={24}>
          <Flex gap={16}>
            <Stack gap={12} style={styles.common}>
              <div {...stylex.props(styles.personality, text.defaultMedium)}>
                <div>{magicItem?.name ?? 'Не выбрано'}</div>
              </div>
              <Stack gap={4}>
                <KeyValue keyLabel={'Цена:'} value={magicItem?.price ?? 'Не указано'} />
                <KeyValue keyLabel={'Редкость:'} value={magicItem?.rarity_name ?? 'Не указано'} />
              </Stack>
            </Stack>
            {/* <Avatar size={120} /> */}
          </Flex>
        </Stack>

        <Accordion>
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
              <div {...stylex.props(styles.panel, text.defaultRegular)}>{magicItem?.description ?? 'Не указано'}</div>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

const KeyValue = ({ keyLabel, value }: { keyLabel?: ReactNode; value?: ReactNode }) => {
  return (
    <Flex gap={4} style={text.defaultMedium}>
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
  }
});
