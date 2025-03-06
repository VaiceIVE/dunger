// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Container } from '@dunger/ui';
import { BeastCard } from 'features/BeastCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { BeastForm } from './_components/BeastForm';

export const BeastPage = () => {
  // const { id } = useParams();

  // const [formState, setFormState] = useState(null);

  return (
    <main>
      <Container>
        <SplitViewLayout isLayoutSplit gap={16}>
          <SplitViewLayout.Master span={6}>
            <BeastForm />
          </SplitViewLayout.Master>
          <SplitViewLayout.Detail span={6}>
            <BeastCard />
          </SplitViewLayout.Detail>
        </SplitViewLayout>
      </Container>
    </main>
  );
};
