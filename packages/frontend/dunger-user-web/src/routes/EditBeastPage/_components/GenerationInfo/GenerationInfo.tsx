import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Accordion, AiFillIcon, ChevronDownIcon, ChevronUpIcon, Flex, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiCreatureAiInput, ApiCreatureRole } from 'store/_types';
import { BeastRegeneration } from '../BeastRegeneration';

interface GenerationInfoProps {
  id: string;
  generation_info: ApiCreatureAiInput;
}

export const GenerationInfo = ({ generation_info, id }: GenerationInfoProps) => {
  return (
    <Fragment>
      <Accordion>
        <Accordion.Item style={styles.root} value="main">
          <Accordion.Control style={[styles.control, text.subheaderSemibold]}>
            {(open: boolean) => (
              <Fragment>
                <Flex gap={8}>
                  <AiFillIcon {...stylex.props(styles.ai)} />
                  Запрос по генерации существа
                </Flex>
                {open ? (
                  <ChevronUpIcon aria-selected={true} {...stylex.props(styles.chevron)} />
                ) : (
                  <ChevronDownIcon {...stylex.props(styles.chevron)} />
                )}
              </Fragment>
            )}
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap={16} style={styles.panel}>
              <p {...stylex.props(text.defaultMedium)}>
                {generation_info.name}, {generation_info.type_name}, уровень опасности{' '}
                {generation_info.challenge_rating},{' '}
                {generation_info.role === ApiCreatureRole.OFFENCE
                  ? 'уклон в атаку'
                  : generation_info.role === ApiCreatureRole.DEFENCE
                    ? 'уклон в защиту'
                    : 'сбалансированный'}
                {!!generation_info.creation_description && ','} {generation_info.creation_description}
              </p>

              <BeastRegeneration generation_info={generation_info} id={id} />
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 10,
    color: colors.textPrimaryDefault
  },
  control: {
    padding: 16
  },
  chevron: {
    backgroundColor: { default: 'transparent', ':is([aria-selected=true])': 'transparent' },
    color: { default: colors.textTertiaryDefault, ':is([aria-selected=true])': colors.brand90 }
  },
  panel: {
    paddingBottom: 16,
    paddingInline: 16
  },
  ai: {
    color: colors.blue60,
    height: 18,
    width: 18
  }
});
