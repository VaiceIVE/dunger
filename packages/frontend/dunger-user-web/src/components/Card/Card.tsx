import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Flex, FlexProps, headers, Stack, StackProps } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

type CardProps = StackProps;

export const Card = ({ gap = 16, style, children, ...props }: CardProps) => {
  return (
    <Stack gap={gap} style={[styles.root, style]} {...props}>
      {children}
    </Stack>
  );
};

const Header = ({ children, style, gap = 8, ...props }: FlexProps) => {
  return (
    <Flex gap={gap} style={[styles.header, style]} {...props}>
      {children}
    </Flex>
  );
};

const Title = ({ children, ...props }: ComponentProps<'h3'>) => {
  return (
    <h3 {...stylex.props(headers.h3Semibold, styles.title)} {...props}>
      {children}
    </h3>
  );
};

const Body = ({ children, style, gap = 32, ...props }: StackProps) => {
  return (
    <Stack gap={gap} style={[styles.body, style]} {...props}>
      {children}
    </Stack>
  );
};

Card.Header = Header;
Card.Title = Title;
Card.Body = Body;

const styles = stylex.create({
  root: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    height: 'calc(100dvh - 64px)',
    overflowY: 'scroll',
    position: 'relative',
    scrollbarGutter: 'stable',
    '::-webkit-scrollbar': {
      background: 'transparent',
      display: 'none',
      height: 0,
      width: 0
    }
  },
  header: {
    backgroundColor: 'white',
    left: 0,
    padding: '18px 24px',
    position: 'sticky',
    top: 0,
    width: '100%'
  },
  title: {
    flex: '1'
  },
  body: {
    paddingBottom: 16,
    paddingInline: 24
  }
});
