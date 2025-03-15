import { PropsWithChildren } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

interface BannerProps extends PropsWithChildren {
  style?: StyleXStyles;

  color?: 'gray' | 'blue' | 'orange';

  title?: string;
}

const styleByColor = {
  gray: colors.backgroundUniversal,
  blue: colors.backgroundBlueDefault,
  orange: colors.backgroundOrangeDefault
};

export const Banner = ({ children, style, title, color = 'gray' }: BannerProps) => {
  return (
    <div {...stylex.props(styles.root(styleByColor[color]), style)}>
      {!!title && <Title>{title}</Title>}
      {children}
    </div>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return <h5 {...stylex.props(text.subheaderSemibold)}>{children}</h5>;
};

Banner.Title = Title;

const styles = stylex.create({
  root: (backgroundColor: string) => ({
    backgroundColor,
    borderRadius: 12,
    color: colors.textPrimaryDefault,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 20
  })
});
