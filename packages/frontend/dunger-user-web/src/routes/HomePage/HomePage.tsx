import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { useAuth } from '@dunger/auth-fetch';
import { Button, ButtonVariant, Container, Grid, headers, PlusIcon, Stack, text } from '@dunger/ui';
import bestiary from './_images/bestiary.png';
import classes from './_images/classes.png';
import magicItems from './_images/magic-items.png';
import species from './_images/species.png';
import s from './HomePage.module.scss';

const cards = [
  { count: 345, name: 'Бестиарий', image: bestiary, path: '/bestiary' },
  { count: 8, name: 'Классы', image: classes },
  { count: 12, name: 'Расы', image: species },
  { count: 213, name: 'Предметы', image: magicItems, path: '/magic-items' }
];

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <main className={s.HomePage}>
      <Container>
        <Grid gap={32}>
          <Grid.Col span={9}>
            <Stack gap={40}>
              {/* <TextInput placeholder="Поиск" leftSection={<SearchIcon />} /> */}
              <ul className={s.HomePage__list}>
                {cards.map((c) => (
                  <Link key={c.name} to={c.path ?? ''}>
                    <li className={s.HomePage__card}>
                      <Stack gap={8}>
                        <h2 {...stylex.props(headers.h2Bold)}>{c.count}</h2>
                        <div className={s.HomePage__name}>{c.name}</div>
                      </Stack>
                      <img src={c.image} className={s.HomePage__image} />
                    </li>
                  </Link>
                ))}
              </ul>
              <div className={s.HomePage__banner}>
                <div className={s.HomePage__content}>
                  <Stack gap={8}>
                    <h3 {...stylex.props(headers.h3Bold)}>Здесь начинается твой путь!</h3>
                    <div {...stylex.props(text.defaultMedium)}>
                      Создай свое первое приключения, планируй партии и все, что будет происходить в них. <br />
                      Теперь приключение можно построить буквально из кирпичиков, избегая всю рутину!
                    </div>
                  </Stack>
                  <Link to={isAuthenticated ? '/adventures' : '/no-auth'}>
                    <Button variant={ButtonVariant.accent}>
                      Создать приключение <PlusIcon width={16} height={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}></Grid.Col>
        </Grid>
      </Container>
    </main>
  );
}
