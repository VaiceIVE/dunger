import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { Flex, FolderIcon, headers, IconButton, LinkIcon, PencilIcon, Stack, XIcon } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const BestiaryCard = () => {
  return (
    <Stack style={styles.root} gap={16}>
      <Flex style={styles.header} gap={8}>
        <h3 {...stylex.props(headers.h3Semibold, styles.name)}>Даратра Шендрел</h3>
        <IconButton>
          <PencilIcon />
        </IconButton>
        <IconButton>
          <LinkIcon />
        </IconButton>
        <IconButton>
          <FolderIcon />
        </IconButton>
        <Link to={'/bestiary'}>
          <IconButton>
            <XIcon />
          </IconButton>
        </Link>
      </Flex>
      <Stack style={styles.content} gap={32}></Stack>
    </Stack>
  );
};

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
    padding: '24px 24px 12px',
    position: 'sticky',
    top: 0,
    width: '100%'
  },
  name: {
    flex: '1'
  },
  content: {
    paddingBottom: 16,
    paddingInline: 24
  }
});
