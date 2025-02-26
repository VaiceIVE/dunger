import { PropsWithChildren } from 'react';
import { Grid, GridProps } from '@dunger/ui';
import { SplitViewLayoutProvider, useSplitViewLayoutContext } from './SplitViewLayout.context';

interface SplitViewLayoutProps extends PropsWithChildren, GridProps {
  isLayoutSplit?: boolean;
}

interface LayoutProps extends PropsWithChildren {
  span?: number;
}

export const SplitViewLayout = ({
  isLayoutSplit = false,
  children,
  gap = 16,
  align = 'top',
  ...props
}: SplitViewLayoutProps) => {
  return (
    <SplitViewLayoutProvider value={{ isLayoutSplit }}>
      <Grid {...props} align={align} gap={gap}>
        {children}
      </Grid>
    </SplitViewLayoutProvider>
  );
};

const Detail = ({ children, span = 7 }: LayoutProps) => {
  const ctx = useSplitViewLayoutContext();

  if (!ctx.isLayoutSplit) return null;

  return <Grid.Col span={span}>{children}</Grid.Col>;
};

const Master = ({ children, span = 5 }: LayoutProps) => {
  const ctx = useSplitViewLayoutContext();

  return <Grid.Col span={ctx.isLayoutSplit ? span : 12}>{children}</Grid.Col>;
};

SplitViewLayout.Detail = Detail;
SplitViewLayout.Master = Master;
