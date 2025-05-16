import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import { Container, Flex, headers, IconButton, PencilIcon } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiAdventure } from 'store/_types/ApiAdventure';
import { invariant } from 'utils/invariant';

export const AdventurePage = () => {
  const { id } = useParams();
  invariant(id);

  const authFetch = useAuthFetch();
  const { data: adventure } = useSuspenseQuery({
    queryKey: ['creatures', { id }],
    queryFn: () => authFetch<ApiAdventure>(`/adventure/${id}`)
  });

  return (
    <main {...stylex.props(styles.root)}>
      <Container style={styles.container}>
        <Flex gap={10}>
          <h1 {...stylex.props(headers.h1Bold)}>{adventure.name}</h1>
          <IconButton size="sm">
            <PencilIcon />
          </IconButton>
        </Flex>
      </Container>
    </main>
  );
};

const styles = stylex.create({
  root: {
    color: colors.textPrimaryDefault
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 40
  }
});
