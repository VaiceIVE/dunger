import { FC, Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Accordion, ChevronDownIcon, ChevronUpIcon, headers, IconButton } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiCreature } from 'store/_types';
import { ActionsSection } from '../ActionsSection';
import { CommonSection } from '../CommonSection';
import { StatblockSection } from '../StatblockSection';
import { TraitsSection } from '../TraitsSection';

const sections = [
  { id: 'commonInfo', title: 'Общая информация' },
  { id: 'statblock', title: 'Статблок' },
  { id: 'actions', title: 'Действия' },
  { id: 'traits', title: 'Особенности' }
];

const sectionById: Record<string, FC<SectionProps>> = {
  commonInfo: CommonSection,
  statblock: StatblockSection,
  actions: ActionsSection,
  traits: TraitsSection
};

interface BeastFormProps {
  formState: ApiCreature & { languages_string_ids: string[]; biomes_string_ids: string[] };

  handleFieldChange: (value: unknown, name: string) => void;
}

export type SectionProps = BeastFormProps;

export const BeastForm = ({ formState, handleFieldChange }: BeastFormProps) => {
  return (
    <Accordion defaultValue={[sections[0].id]} transitionDuration={600} multiple style={styles.root}>
      {sections.map((s, index) => {
        const Section = sectionById[s.id];

        return (
          <Accordion.Item style={styles.section} value={s.id} key={s.id}>
            <Accordion.Control style={[headers.h3Semibold, styles.control]}>
              {(open: boolean) => (
                <Fragment>
                  <div>
                    {index + 1}. {s.title}
                  </div>
                  <IconButton type="button" aria-selected={open} size={'sm'}>
                    {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </IconButton>
                </Fragment>
              )}
            </Accordion.Control>

            <Accordion.Panel>
              <div {...stylex.props(styles.panel)}>
                <Section formState={formState} handleFieldChange={handleFieldChange} />
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault,
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  },
  section: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2
  },
  control: {
    padding: '18px 24px'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: '16px 24px 24px'
  }
});
