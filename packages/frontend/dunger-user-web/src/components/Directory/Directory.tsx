import { PropsWithChildren } from 'react';
import { Grid } from '@dunger/ui';

export const Directory = ({ children }: PropsWithChildren) => {
  return (
    <Grid gap={16} rowGap={8}>
      {children}
    </Grid>
  );
};
