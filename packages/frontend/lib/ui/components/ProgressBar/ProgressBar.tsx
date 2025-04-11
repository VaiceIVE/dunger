import * as stylex from '@stylexjs/stylex';
import { colors } from '../../tokens.stylex';
import { text } from '../../utils/text';
import { Stack } from '../Stack';

interface ProgressBarProps {
  value?: number;
  max?: number;
  description?: string;
  title?: string;
}

export const ProgressBar = ({ value, max, description, title }: ProgressBarProps) => {
  const percent = value && max ? Math.floor((value / max) * 100) : 0;

  return (
    <Stack gap={4} style={[text.defaultMedium, styles.root]}>
      <div>
        {!!title && <span {...stylex.props(text.defaultSemibold)}>{title}: </span>}
        <span {...stylex.props(styles.value)}>
          {value}/{max}
        </span>{' '}
        {description}
      </div>
      <div>
        <div {...stylex.props(styles.bar)}>
          <div {...stylex.props(styles.progress(percent))}></div>
        </div>
      </div>
    </Stack>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textSecondaryDefault
  },
  bar: {
    backgroundColor: colors.backgroundNeutralDefault,
    borderRadius: 2,
    height: 8,
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  },
  progress: (width: number) => ({
    height: '100%',
    width: `${String(width)}%`,
    backgroundColor: colors.brand80,
    borderRadius: 2
  }),
  value: {
    color: colors.brand80
  }
});
