import { useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { useQuery } from '@tanstack/react-query';
import { useAuthFetch } from '@dunger/auth-fetch';
import { Flex, Radio, Spinner, Stack, text } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { ApiTrait } from 'store/_types';

interface ActionListProps {
  style?: StyleXStyles;

  groupId: string;

  opened: boolean;

  name: string;

  setValue: (actionObj: Record<string, ApiTrait>) => void;
}

export const TraitList = ({ groupId, opened, name, style, setValue }: ActionListProps) => {
  const hasBeenOpenedRef = useRef(opened);
  hasBeenOpenedRef.current = opened || hasBeenOpenedRef.current;

  const authFetch = useAuthFetch();

  const { data: actions, isLoading } = useQuery({
    queryKey: ['creatures', 'traits', groupId],
    queryFn: () => authFetch<ApiTrait[]>(`/creatures/traits/groups/${groupId}`),
    enabled: hasBeenOpenedRef.current,
    refetchOnWindowFocus: false
  });

  return (
    <Stack gap={8} style={[styles.root, style]}>
      {isLoading && <Spinner />}
      {actions?.map((a) => (
        <Stack style={styles.card} key={a.id} gap={10}>
          <Flex align="flex-start" justify="space-between" wrap="nowrap" gap={12}>
            <div {...stylex.props(text.smallMedium)}>{a.description.replaceAll('{name}', name)}</div>
            <Radio
              onClick={() => {
                setValue({ [a.name]: a });
              }}
              size="sm"
              value={a.id.toString()}
            />
          </Flex>
        </Stack>
      ))}
    </Stack>
  );
};

const styles = stylex.create({
  root: {
    padding: '12px'
  },
  card: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 14
  }
});
