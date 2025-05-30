import { FormEvent, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  Button,
  ButtonVariant,
  ChevronsUpIcon,
  Container,
  Flex,
  Footer,
  headers,
  IconButton,
  Stack,
  text
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { MagicItemCard } from 'features/MagicItemCard';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { ApiMagicItem } from 'store/_types';
import { invariant } from 'utils/invariant';
import { MagicItemForm } from './_components/MagicItemForm';
import { useEditMagicItemAction } from './useEditMagicItemAction';

export const EditMagicItemPage = () => {
  const { id } = useParams();
  invariant(id);

  const authFetch = useAuthFetch();
  const { data: magicItem } = useSuspenseQuery({
    queryKey: ['magic-items', { id }],
    queryFn: () => authFetch<ApiMagicItem>(`/magic-items/${id}`)
  });

  const { saveAction } = useEditMagicItemAction();

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
      <form onSubmit={handleSubmit}>
        <Container style={styles.root}>
          <SplitViewLayout isLayoutSplit gap={16}>
            <SplitViewLayout.Master span={6}>
              <Stack gap={32}>
                <h2 {...stylex.props(headers.h2Bold)}>Редактирование магического предмета</h2>
                <input type={'hidden'} name={'id'} value={id} />
                <MagicItemForm />
              </Stack>
            </SplitViewLayout.Master>

            <SplitViewLayout.Detail span={6}>
              <MagicItemCard magicItem={magicItem} style={styles.card} />
            </SplitViewLayout.Detail>
          </SplitViewLayout>
        </Container>

        <Footer style={styles.footer}>
          <Container style={styles.container}>
            <Flex gap={8}>
              <Button type="submit" disabled={!changed} variant={ButtonVariant.accent}>
                Закончить редактирование
              </Button>
              <IconButton type="button" onClick={scrollToTop} size="lg">
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
  root: { color: colors.textPrimaryDefault, paddingBottom: 84 },
  card: { height: 'calc(100dvh - 116px)', position: 'sticky', right: 0, top: 32 },
  footer: { left: 'unset', right: 0, width: 'calc(100% - 77px)' },
  container: { alignItems: 'center', display: 'flex', justifyContent: 'space-between', paddingBlock: 12 },
  saved: { color: colors.textTertiaryDefault }
});
