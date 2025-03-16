// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import * as stylex from '@stylexjs/stylex';
import { Button, ButtonVariant, Container, Flex, Footer, IconButton } from '@dunger/ui';
import { BeastCard } from 'features/BeastCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { BeastForm } from './_components/BeastForm';

export const BeastPage = () => {
  // const { id } = useParams();

  // const [formState, setFormState] = useState(null);

  return (
    <main>
      <Container style={styles.root}>
        <SplitViewLayout isLayoutSplit gap={16}>
          <SplitViewLayout.Master span={6}>
            <BeastForm />
          </SplitViewLayout.Master>
          <SplitViewLayout.Detail span={6}>
            <BeastCard style={styles.card} />
          </SplitViewLayout.Detail>
        </SplitViewLayout>
      </Container>
      <Footer style={styles.footer}>
        <Container style={styles.container}>
          <Flex gap={8}>
            <Button variant={ButtonVariant.accent}>Закончить редактирование</Button>
            <IconButton size="lg"></IconButton>
          </Flex>
          <div>321</div>
        </Container>
      </Footer>
    </main>
  );
};

const styles = stylex.create({
  root: {
    paddingBottom: 84
  },
  card: {
    height: 'calc(100dvh - 116px)',
    position: 'sticky',
    right: 0,
    top: 32
  },
  footer: {
    left: 'unset',
    right: 0,
    width: 'calc(100% - 77px)'
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBlock: 12
  }
});
