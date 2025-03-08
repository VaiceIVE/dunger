import { PropsWithChildren } from 'react';
import * as stylex from '@stylexjs/stylex';
import { text } from '@utils/text';
import { colors } from 'tokens.stylex';

export interface TagProps extends PropsWithChildren {
  color?: 'orange' | 'purple' | 'blue' | 'gray';
}

const styleByColor = {
  orange: { backgroundColor: colors.orange5, color: colors.brand80 },
  purple: { backgroundColor: colors.purple20, color: colors.purple80 },
  blue: { backgroundColor: colors.blue10, color: colors.blue80 },
  gray: { backgroundColor: colors.backgroundUniversal, color: colors.black70 }
};

export const Tag = ({ children, color = 'gray' }: TagProps) => {
  return (
    <div
      {...stylex.props(text.smallMedium, styles.root(styleByColor[color].backgroundColor, styleByColor[color].color))}>
      {children}
    </div>
  );
};

const styles = stylex.create({
  root: (backgroundColor: string, color: string) => ({
    backgroundColor,
    borderRadius: 12,
    color,
    padding: '2px 6px',
    width: 'fit-content'
  })
});
