import { Fragment, PropsWithChildren } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { Grid, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

interface DirectoryItemProps extends PropsWithChildren {
  active?: boolean;

  fullWidth?: boolean;

  to?: string;

  gap?: number;
}

export const DirectoryItem = ({ active, fullWidth, to, gap = 4, children }: DirectoryItemProps) => {
  return (
    <Grid.Col span={fullWidth ? 12 : 6} asChild>
      {to ? (
        <Link to={to} preventScrollReset replace>
          <Stack aria-selected={active} style={styles.root} gap={gap}>
            {children}
          </Stack>
        </Link>
      ) : (
        <div>
          <Stack aria-selected={active} style={styles.root} gap={gap}>
            {children}
          </Stack>
        </div>
      )}
    </Grid.Col>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return <div {...stylex.props(text.defaultSemibold)}>{children}</div>;
};

const Content = ({ children }: PropsWithChildren) => {
  return <Fragment>{children}</Fragment>;
};

DirectoryItem.Title = Title;
DirectoryItem.Content = Content;

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: 'transparent',
      ':is([aria-selected=true])': colors.backgroundUniversal
    },
    borderRadius: 10,
    boxShadow: {
      default: 'none',
      ':hover': '0 4px 4px -4px #0C0C0D0D, 0 16px 32px -4px #0C0C0D1A'
    },
    outlineColor: {
      default: colors.outlinePrimaryDefault,
      ':is([aria-selected=true])': colors.outlinePrimaryActive,
      ':is([aria-selected=true]):hover': colors.outlinePrimaryActive,
      ':hover': colors.outlinePrimaryHover
    },
    outlineStyle: 'solid',
    outlineWidth: {
      default: '1px',
      ':is([aria-selected=true])': '2px'
    },
    padding: 16,
    transition: 'all 0.2s'
  }
});
