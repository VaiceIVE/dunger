import { Fragment, PropsWithChildren, ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

interface KeyValueProps {
  keyLabel?: ReactNode;

  value?: ReactNode;

  children?: ReactNode;
}

export const KeyValue = ({ keyLabel, value, children }: KeyValueProps) => {
  return (
    <div {...stylex.props(text.defaultMedium)}>
      {children ?? (
        <Fragment>
          <span {...stylex.props(styles.key, text.defaultSemibold)}>{keyLabel}</span>{' '}
          <span {...stylex.props(styles.value)}>{value}</span>
        </Fragment>
      )}
    </div>
  );
};

interface KeyValueComponentProps extends PropsWithChildren {
  style?: StyleXStyles;
}

const Key = ({ children, style }: KeyValueComponentProps) => {
  return <span {...stylex.props(styles.key, text.defaultSemibold, style)}>{children}</span>;
};

const Value = ({ children, style }: KeyValueComponentProps) => {
  return <span {...stylex.props(styles.value, style)}>{children}</span>;
};

KeyValue.Key = Key;
KeyValue.Value = Value;

const styles = stylex.create({
  key: {
    color: colors.textPrimaryDefault
  },
  value: {
    color: colors.textSecondaryDefault
  }
});
