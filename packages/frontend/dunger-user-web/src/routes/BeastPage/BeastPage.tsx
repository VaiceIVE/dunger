import { FormEvent, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useParams } from 'react-router-dom';
import { Button, ButtonVariant, ChevronsUpIcon, Container, Flex, Footer, IconButton, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { BeastCard } from 'features/BeastCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { Beast } from 'store/apiTypes.gen';
import { BeastForm } from './_components/BeastForm';
import { useBeastAction } from './useBeastAction';

export const BeastPage = () => {
  const { id } = useParams();
  const { saveAction } = useBeastAction();

  const [formState] = useState<null | Beast>(null);
  const [changed, setChanged] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!changed) return;
    if (!e.currentTarget.reportValidity()) return;
    void saveAction(new FormData(e.currentTarget))
      .then(() => {
        setChanged(false);
        setIsSaved(true);
      })
      .catch(() => {
        setIsFailed(true);
      });
  };

  const handleChange = () => {
    setChanged(true);
    setIsSaved(false);
    setIsFailed(false);
  };

  return (
    <main>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <Container style={styles.root}>
          <SplitViewLayout isLayoutSplit gap={16}>
            <SplitViewLayout.Master span={6}>
              <input type={'hidden'} name={'id'} value={id} />
              <BeastForm />
            </SplitViewLayout.Master>
            <SplitViewLayout.Detail span={6}>
              <BeastCard beast={formState} style={styles.card} />
            </SplitViewLayout.Detail>
          </SplitViewLayout>
        </Container>
        <Footer style={styles.footer}>
          <Container style={styles.container}>
            <Flex gap={8}>
              <Button disabled={!changed} variant={ButtonVariant.accent}>
                Закончить редактирование
              </Button>
              <IconButton onClick={scrollToTop} size="lg">
                <ChevronsUpIcon />
              </IconButton>
            </Flex>
            <div {...stylex.props(text.defaultMedium, styles.saved)}>
              {isSaved ? 'Изменения сохранены!' : isFailed ? 'Произошла ошибка' : null}
            </div>
          </Container>
        </Footer>
      </form>
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
  },
  saved: {
    color: colors.textTertiaryDefault
  }
});
