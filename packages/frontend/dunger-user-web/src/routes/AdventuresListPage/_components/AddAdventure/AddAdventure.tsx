import * as stylex from '@stylexjs/stylex';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import {
  Modal,
  headers,
  Stack,
  TextInput,
  Select,
  MultiSelect,
  Button,
  ButtonWidth,
  ButtonVariant,
  text
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiDirectory } from 'store/_types/_common';
import { ApiKeyword } from 'store/_types/ApiKeyword';
import { useAddAdventureAction } from './useAddAdventureAction';

interface AddAdventureProps {
  open: boolean;

  setOpen: (open: boolean) => void;
}

export const AddAdventure = ({ open, setOpen }: AddAdventureProps) => {
  const authFetch = useAuthFetch();

  const { action } = useAddAdventureAction();

  const { data: genres } = useSuspenseQuery<ApiDirectory[]>({
    queryKey: ['directories', 'genres'],
    queryFn: () => authFetch(`/directories/genres`)
  });

  const { data: keywords } = useSuspenseQuery<ApiKeyword[]>({
    queryKey: ['directories', 'keywords'],
    queryFn: () => authFetch(`/directories/keywords`)
  });

  const genreOptions = genres.map(({ id, name }) => ({ value: String(id), label: name }));
  const keywordOptions = keywords.map(({ id, name }) => ({ value: String(id), label: name }));

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content>
        <form action={action} {...stylex.props(styles.content)}>
          <h2 {...stylex.props(headers.h2Bold, styles.title)}>Новое приключение</h2>
          <div {...stylex.props(text.defaultMedium)}>Все эти данные можно изменить позже на странице приключения</div>
          <Stack gap={16}>
            <TextInput required label="Название приключения" placeholder="Например, Ужас страда" name="name" />
            <Select required options={genreOptions} label="Жанр" placeholder="Выберите жанр" name="genre_id" />
            <MultiSelect
              name="keyword_ids"
              options={keywordOptions}
              label="Выберите ключевые слова"
              placeholder="Выберите ключевые слова"
            />
          </Stack>
          <Button type="submit" width={ButtonWidth.full} variant={ButtonVariant.accent}>
            Создать и перейти
          </Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

const styles = stylex.create({
  content: {
    color: colors.textSecondaryDefault,
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  },
  title: {
    color: colors.textPrimaryDefault
  }
});
