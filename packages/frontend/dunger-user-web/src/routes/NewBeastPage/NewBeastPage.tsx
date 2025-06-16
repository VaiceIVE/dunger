import { FormEventHandler, Fragment, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Container, Stack, text, WizardLoader } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { Banner } from 'components/Banner';
import { LoadingOverlay } from 'features/LoadingOverlay';
import { SplitViewLayout } from 'features/SplitViewLayout';
import { Switch } from 'features/Switch';
import { NewBeastForm } from './_components/NewBeastForm';
import { CreateMode } from './NewBeastPage.types';
import { useNewBeastAction } from './useNewBeastAction';

export const NewBeastPage = () => {
  const [mode, setMode] = useState(CreateMode.generation);
  const { createAction, generateAction, loading } = useNewBeastAction();

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
      <Container style={styles.root}>
        <LoadingOverlay loading={loading}>
          <Stack align="center" gap={12}>
            <WizardLoader />
            <div {...stylex.props(text.subheaderSemibold)}>Идет создание, подождите</div>
          </Stack>
        </LoadingOverlay>

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
              <NewBeastForm mode={mode} handleSubmit={handleSubmit} />
            </Stack>
          </SplitViewLayout.Master>

          <SplitViewLayout.Detail span={5}>
            <ExampleBlock mode={mode} />
          </SplitViewLayout.Detail>
        </SplitViewLayout>
      </Container>
    </main>
  );
};

const ExampleBlock = ({ mode }: { mode: CreateMode }) => (
  <Banner title="Пример заполнения">
    <Stack style={[styles.description, text.defaultMedium]} gap={8}>
      <div>
        <span {...stylex.props(text.defaultSemibold)}>Название:</span> Ледяной троллинг
      </div>
      {mode === CreateMode.generation && (
        <Fragment>
          <div>
            <span {...stylex.props(text.defaultSemibold)}>Описание:</span> Тролль, который обитает только в водоёмах и
            замораживает их. Способности связаны со льдом. Хаотично злой
          </div>
          <div>
            <span {...stylex.props(text.defaultSemibold)}>Тип:</span> Элементаль
          </div>
        </Fragment>
      )}
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
);

const styles = stylex.create({
  root: { color: colors.textPrimaryDefault, position: 'relative' },
  description: { color: colors.textSecondaryDefault }
});
