import { Fragment, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { Accordion, ChevronDownIcon, ChevronUpIcon, Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Card } from 'components/Card';
import { ApiMagicItem } from 'store/_types';

interface magicItemCardProps {
  magicItem?: ApiMagicItem | null;

  controls?: ReactNode;

  style?: StyleXStyles;
}

export const MagicItemCard = ({ magicItem, controls, style }: magicItemCardProps) => {
  return (
    <Card style={[styles.root, style]}>
      <Card.Header>
        <Card.Title>{magicItem?.name === '' ? 'Без названия' : (magicItem?.name ?? 'Без названия')} </Card.Title>
        {controls}
      </Card.Header>

      <Card.Body>
        <Stack gap={24}>
          <Flex gap={16}>
            <Stack gap={12} style={styles.common}>
              <Stack gap={4}>
                <KeyValue keyLabel={'Тип:'} value={magicItem?.type?.name ?? 'Не указано'} />
                <KeyValue
                  keyLabel={'Настройка:'}
                  value={
                    magicItem?.requires_attunement
                      ? magicItem.attunements.length
                        ? `требуется настройка (${magicItem.attunements.map((a) => a.name).join(', ')})`
                        : 'требуется настройка'
                      : 'Нет'
                  }
                />
                <KeyValue keyLabel={'Цена:'} value={magicItem?.cost ?? 'Не указано'} />
                <KeyValue keyLabel={'Редкость:'} value={magicItem?.rarity?.name ?? 'Не указано'} />
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
                    <ChevronUpIcon aria-selected={true} {...stylex.props(styles.chevron)} />
                  ) : (
                    <ChevronDownIcon {...stylex.props(styles.chevron)} />
                  )}
                </Fragment>
              )}
            </Accordion.Control>
            <Accordion.Panel>
              <div
                {...stylex.props(styles.panel, text.defaultRegular)}
                dangerouslySetInnerHTML={{
                  __html: magicItem?.description === '' ? 'Не указано' : (magicItem?.description ?? 'Не указано')
                }}
              />
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
    backgroundColor: { default: 'transparent', ':is([aria-selected=true])': 'transparent' },
    color: { default: colors.textTertiaryDefault, ':is([aria-selected=true])': colors.brand90 }
  },
  panel: {
    paddingBottom: 16,
    paddingInline: 16
  }
});
