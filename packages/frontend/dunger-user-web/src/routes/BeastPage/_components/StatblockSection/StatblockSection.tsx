import { Fragment } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Input,
  MultiSelect,
  PlusFilledIcon,
  Select,
  Stack,
  text,
  TextInput
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

export const StatblockSection = () => {
  return (
    <Fragment>
      <Stack style={styles.root} gap={24}>
        <Flex gap={8}>
          <TextInput label="Количество хитов" placeholder="Введите кол-во хитов" />
          <Select label="Класс Опасности (CR)" placeholder="-Не выбрано-" />
        </Flex>
        <div {...stylex.props(text.smallMedium)}>
          Выберите характеристики, а также спасброски, которыми владеет существо
        </div>
        <Grid columns={6} gap={8}>
          <Grid.Col style={styles.stat}>
            <TextInput label="СИЛ" placeholder="8" />
            <Checkbox />
          </Grid.Col>
          <Grid.Col style={styles.stat}>
            <TextInput label="ЛОВ" placeholder="8" />
            <Checkbox />
          </Grid.Col>
          <Grid.Col style={styles.stat}>
            <TextInput label="ТЕЛ" placeholder="8" />
            <Checkbox />
          </Grid.Col>
          <Grid.Col style={styles.stat}>
            <TextInput label="ИНТ " placeholder="8" />
            <Checkbox />
          </Grid.Col>
          <Grid.Col style={styles.stat}>
            <TextInput label="МДР" placeholder="8" />
            <Checkbox />
          </Grid.Col>
          <Grid.Col style={styles.stat}>
            <TextInput label="ХАР" placeholder="8" />
            <Checkbox />
          </Grid.Col>
        </Grid>
      </Stack>
      <Select placeholder="-Не выбрано-" label="Тип брони" />
      <Input.Wrapper label="Навыки">
        <Button type="button">
          Выбрать навыки <PlusFilledIcon {...stylex.props(styles.icon)} />
        </Button>
      </Input.Wrapper>
      <MultiSelect multiple searchable placeholder="Начните вводить" label="Уязвимость к видам урону" />
      <MultiSelect multiple searchable placeholder="Начните вводить" label="Сопротивление к видам урону" />
      <MultiSelect multiple searchable placeholder="Начните вводить" label="Иммунитет к видам урону" />
    </Fragment>
  );
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.backgroundUniversal,
    borderRadius: 16,
    padding: 16
  },
  stat: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  icon: {
    height: 16,
    width: 16
  }
});
