import { Container, Grid, Stack } from '@dunger/ui';

export const BestiaryPage = () => {
  return (
    <main>
      <Container>
        <Stack gap={29}>
          <div>Бестиарий</div>
          <Stack gap={16}>
            <div>Поиск</div>
            <Grid gap={16} rowGap={8}>
              <Grid.Col span={6}>карточка</Grid.Col>
              <Grid.Col span={6}>карточка</Grid.Col>
              <Grid.Col span={6}>карточка</Grid.Col>
              <Grid.Col span={6}>карточка</Grid.Col>
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </main>
  );
};
