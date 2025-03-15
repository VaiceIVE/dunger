import { FormEventHandler, Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import {
  AiFillIcon,
  Button,
  ButtonVariant,
  ButtonWidth,
  Chips,
  Container,
  Flex,
  SearchIcon,
  Select,
  Stack,
  text,
  Textarea,
  TextInput
} from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Banner } from 'components/Banner';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { Switch } from 'features/Switch';
import { useNewBeastAction } from './useNewBeastAction';

enum CreateMode {
  manual = 'manual',
  generation = 'generation'
}

export const NewBeastPage = () => {
  const [mode, setMode] = useState(CreateMode.generation);
  const { createAction, generateAction } = useNewBeastAction();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;

    if ((submitter.value as CreateMode) == CreateMode.generation) {
      void generateAction(formData);
    } else {
      void createAction(formData);
    }
  };

  return (
    <main>
      <Container>
        <SplitViewLayout isLayoutSplit>
          <SplitViewLayout.Master span={7}>
            <Stack gap={16}>
              <Switch
                value={mode}
                onChange={(e) => {
                  setMode(e as CreateMode);
                }}
                options={[
                  { value: CreateMode.generation, label: 'Генерация статблока' },
                  { value: CreateMode.manual, label: 'Заполнение вручную' }
                ]}
              />
              <form key={mode} onSubmit={handleSubmit} {...stylex.props(styles.form)}>
                <Stack gap={24}>
                  {mode === CreateMode.generation ? (
                    <Banner color="blue">
                      <Banner.Title>
                        <Flex gap={8}>
                          <AiFillIcon {...stylex.props(styles.titleIcon)} /> Режим генерации статблока
                        </Flex>
                      </Banner.Title>
                      <div {...stylex.props(styles.description, text.defaultMedium)}>
                        Заполните минимальные поля, чтобы мы смогли автоматически подставить значения.{' '}
                        <span {...stylex.props(text.defaultSemibold)}>
                          Вы сможете отредактировать статблок после генерации.
                        </span>
                      </div>
                    </Banner>
                  ) : (
                    <Banner color="blue">
                      <Banner.Title>
                        <Flex gap={8}>
                          <AiFillIcon {...stylex.props(styles.titleIcon)} /> Режим ручного заполнения статблока
                        </Flex>
                      </Banner.Title>
                      <div {...stylex.props(styles.description, text.defaultMedium)}>
                        Заполните начальные поля, чтобы перейти к следующему шагу
                      </div>
                    </Banner>
                  )}

                  <TextInput name="name" label="Название существа" placeholder="Например, “Хобгоблин-вожак”" required />

                  {mode === CreateMode.generation ? (
                    <Fragment>
                      <Flex gap={16}>
                        <Select
                          options={[
                            { label: 'test', value: '1' },
                            { label: 'test2', value: '2' }
                          ]}
                          name="beastTypeId"
                          label="Тип"
                          placeholder="-Не выбрано-"
                          required
                        />
                        <Select
                          name="challengeRating"
                          label="Класс Опасности (CR)"
                          placeholder="-Не выбрано-"
                          required
                        />
                      </Flex>
                      <Chips.Group name="type" label="Роль в бою">
                        <Chips value="damage">Уклон в атаку</Chips>
                        <Chips value="defense">Уклон в защиту</Chips>
                        <Chips value="balanse">Сбалансированный</Chips>
                      </Chips.Group>
                      <Textarea
                        label="Пожелания по генерации существа"
                        placeholder="Опишите способности, мировоззрение и другие детали, которые характеризуют существо. Например: “стреляет ледяной паутиной”"
                        autosize
                        minRows={3}
                        maxRows={8}
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Select name="challengeRating" label="Класс Опасности (CR)" placeholder="-Не выбрано-" required />
                      <Select
                        label="Шаблон заполнения"
                        name="templateId"
                        leftSection={<SearchIcon />}
                        placeholder="Начните вводить"
                        searchable
                      />
                    </Fragment>
                  )}
                </Stack>

                {mode === CreateMode.generation ? (
                  <Button
                    value={CreateMode.generation}
                    variant={ButtonVariant.tertiarySecondary}
                    width={ButtonWidth.full}>
                    Генерировать статблок{' '}
                    <div {...stylex.props(styles.buttonIconWrapper)}>
                      <AiFillIcon {...stylex.props(styles.buttonIcon)} />
                    </div>
                  </Button>
                ) : (
                  <Button value={CreateMode.manual} width={ButtonWidth.full}>
                    Продолжить заполнение
                  </Button>
                )}
              </form>
            </Stack>
          </SplitViewLayout.Master>

          <SplitViewLayout.Detail span={5}>
            <Banner title="Пример заполнения">
              <Stack style={[styles.description, text.defaultMedium]} gap={8}>
                <div>
                  <span {...stylex.props(text.defaultSemibold)}>Название:</span> Ледяной троллинг
                </div>
                {mode === CreateMode.generation && (
                  <div>
                    <span {...stylex.props(text.defaultSemibold)}>Описание:</span> Тролль, который обитает только в
                    водоёмах и замораживает их. Способности связаны со льдом. Хаотично злой
                  </div>
                )}
                <div>
                  <span {...stylex.props(text.defaultSemibold)}>Тип:</span> Элементаль
                </div>
                <div>
                  <span {...stylex.props(text.defaultSemibold)}>Класс Опасности (CR):</span> 6
                </div>
                {mode === CreateMode.manual && (
                  <div>
                    <span {...stylex.props(text.defaultSemibold)}>Шаблон:</span> Грязевой мефит
                  </div>
                )}
              </Stack>
            </Banner>
          </SplitViewLayout.Detail>
        </SplitViewLayout>
      </Container>
    </main>
  );
};

const styles = stylex.create({
  form: {
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    padding: 24
  },
  description: {
    color: colors.textSecondaryDefault
  },
  titleIcon: {
    color: colors.blue60
  },
  buttonIconWrapper: {
    alignItems: 'center',
    backgroundColor: colors.backgroundBlueDefault,
    borderRadius: '50%',
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    width: 30
  },
  buttonIcon: {
    color: colors.blue60,
    height: 14,
    width: 14
  }
});
