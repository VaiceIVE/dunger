import { FormEvent, useMemo, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  ArrowRightIcon,
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
import { ApiGender, ApiMagicItem } from 'store/_types';
import { invariant } from 'utils/invariant';
import { updateNestedField } from 'utils/updateNestedField';
import { MagicItemForm } from './_components/MagicItemForm';
import { useDirectoryOptions } from './useDirectoryOptions';
import { useEditMagicItemAction } from './useEditMagicItemAction';

export const EditMagicItemPage = () => {
  const { id } = useParams();
  invariant(id);

  const navigate = useNavigate();

  const authFetch = useAuthFetch();
  const { data: magicItem } = useSuspenseQuery({
    queryKey: ['magic-items', { id }],
    queryFn: () => authFetch<ApiMagicItem>(`/magic-items/${id}`)
  });

  const { magicItemTypes, magicItemRarities } = useDirectoryOptions();

  const [formState, setFormState] = useState<
    ApiMagicItem & { attunement_ids: string[]; type_id: string | null; rarity_id: string | null }
  >({
    ...magicItem,
    attunement_ids: magicItem.attunements.map((i) => i.id),
    type_id: magicItem.type?.id ?? null,
    rarity_id: magicItem.rarity?.id ?? null
  });

  const _magicItem: ApiMagicItem = useMemo(() => {
    const type = magicItemTypes.find((t) => t.id.toString() === formState.type_id) ?? null;
    const rarity = magicItemRarities.find((r) => r.id === formState.rarity_id) ?? null;

    return {
      ...formState,
      type,
      cost: rarity?.cost ?? null,
      rarity: !rarity
        ? null
        : {
            id: rarity.id,
            name:
              type?.gender === ApiGender.HE
                ? rarity.name_he
                : type?.gender === ApiGender.SHE
                  ? rarity.name_she
                  : rarity.name_it
          }
    };
  }, [formState, magicItemRarities, magicItemTypes]);

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

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

    void saveAction(new FormData(e.currentTarget))
      .then(() => {
        setChanged(false);
        setIsSaved(true);

        if (submitter.value === 'end') void navigate(`/my-magic-items/${id}`);
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

  const handleFieldChange = (value: unknown, path: string) => {
    setFormState((prev) => updateNestedField(prev, path, value));

    handleChange();
  };

  return (
    <main {...stylex.props(styles.root)}>
      <form onSubmit={handleSubmit}>
        <Container style={styles.content}>
          <SplitViewLayout isLayoutSplit gap={16}>
            <SplitViewLayout.Master span={6}>
              <Stack gap={32}>
                <h2 {...stylex.props(headers.h2Bold)}>Редактирование магического предмета</h2>
                <input type={'hidden'} name={'id'} value={id} />
                <MagicItemForm handleFieldChange={handleFieldChange} formState={formState} />
              </Stack>
            </SplitViewLayout.Master>

            <SplitViewLayout.Detail span={6}>
              <MagicItemCard magicItem={_magicItem} style={styles.card} />
            </SplitViewLayout.Detail>
          </SplitViewLayout>
        </Container>

        <Footer style={styles.footer}>
          <Container style={styles.container}>
            <Flex gap={8}>
              <Button value={'save'} type="submit" disabled={!changed} variant={ButtonVariant.accent}>
                Сохранить
              </Button>
              <Button value={'end'} type="submit" disabled={!changed}>
                Закончить редактирование <ArrowRightIcon width={16} height={16} />
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
  root: { color: colors.textPrimaryDefault, scrollbarGutter: 'stable' },
  content: { paddingBottom: 84 },
  card: { height: 'calc(100dvh - 116px)', position: 'sticky', right: 0, top: 32 },
  footer: { left: 'unset', right: 0, width: 'calc(100% - 77px)' },
  container: { alignItems: 'center', display: 'flex', justifyContent: 'space-between', paddingBlock: 12 },
  saved: { color: colors.textTertiaryDefault }
});
