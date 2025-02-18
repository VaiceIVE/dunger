import { PropsWithChildren } from 'react';
import { Grid, GridProps } from '@dunger/ui';
import { SplitViewLayoutProvider, useSplitViewLayoutContext } from './SplitViewLayout.context';

interface SplitViewLayout extends PropsWithChildren, GridProps {
  isLayoutSplit?: boolean;
}

export const SplitViewLayout = ({
  isLayoutSplit = false,
  children,
  gap = 16,
  align = 'top',
  ...props
}: SplitViewLayout) => {
  return (
    <SplitViewLayoutProvider value={{ isLayoutSplit }}>
      <Grid {...props} align={align} gap={gap}>
        {children}
      </Grid>
    </SplitViewLayoutProvider>
  );
};

const Detail = ({ children }: PropsWithChildren) => {
  const ctx = useSplitViewLayoutContext();

  if (!ctx.isLayoutSplit) return null;

  return <Grid.Col span={7}>{children}</Grid.Col>;
};

const Master = ({ children }: PropsWithChildren) => {
  const ctx = useSplitViewLayoutContext();

  return <Grid.Col span={ctx.isLayoutSplit ? 5 : 12}>{children}</Grid.Col>;
};

SplitViewLayout.Detail = Detail;
SplitViewLayout.Master = Master;
