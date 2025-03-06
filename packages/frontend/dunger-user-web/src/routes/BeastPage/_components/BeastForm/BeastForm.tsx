import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Accordion, ChevronDownIcon, ChevronUpIcon, headers, IconButton } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

const sections = [
  { id: 'commonInfo', title: 'Общая информация' },
  { id: 'statblock', title: 'Статблок' },
  { id: 'actions', title: 'Действия' },
  { id: 'abilities', title: 'Способности и свойства' }
];

export const BeastForm = () => {
  return (
    <Accordion multiple style={styles.root}>
      {sections.map((s, index) => (
        <Accordion.Item style={styles.section} value={s.id} key={s.id}>
          <Accordion.Control style={[headers.h3Semibold, styles.control]}>
            {(open: boolean) => (
              <Fragment>
                <div>
                  {index + 1}. {s.title}
                </div>
                <IconButton aria-selected={open} size={'sm'}>
                  {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </IconButton>
              </Fragment>
            )}
          </Accordion.Control>
        </Accordion.Item>
      ))}
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
  }
});
