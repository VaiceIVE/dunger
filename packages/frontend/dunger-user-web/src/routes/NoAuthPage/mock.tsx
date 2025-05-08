import { ReactNode } from 'react';
import { creature } from './_components/CreaturesContent';
import {
  AnvilIcon,
  BookIcon,
  control,
  customization,
  DiceIcon,
  generation,
  PenIcon,
  ready
} from './_components/FlowContent';

export const words = [
  'Таверна',
  'Гномы',
  'Глубокое подземелье',
  'Ночной',
  'Орки на лютоволках',
  'Лидер',
  'Скрытный',
  'Сильверимун',
  'Замок в пустыне',
  'Снежные горы',
  'Перевертыш',
  'Летающий город',
  'Стая крыс',
  'Подводные овцы',
  'Деревня у озера',
  'Эльфы',
  'Огненный',
  'Золотистого цвета',
  'Пасмурный',
  'Торговец',
  'Бескрайние пустоши',
  'Одноглазый кентавр',
  'Дружелюбный',
  'Метеор желаний',
  'Средний Андердарк',
  'Каменный орел',
  'Герцогство вечной тишины',
  'Неумолимый',
  'Кролень в доспехах'
];

export const flowCard: { title: string; description: string; icon: ReactNode; image: string }[] = [
  {
    title: 'Быстрая генерация',
    description:
      'Опишите идею в пару словах или настройте основные параметры – и ИИ создаст для вас существо с характеристиками, способностями и описанием',
    icon: <AnvilIcon />,
    image: generation
  },
  {
    title: 'Полный контроль',
    description:
      'Хотите полный контроль? Заполняйте поля вручную, настраивайте способности и лор – создавайте монстров на свой вкус.',
    icon: <BookIcon />,
    image: control
  },
  {
    title: 'Редактирование и кастомизация',
    description: 'Клонируйте существ из бестиария, вносите изменения и адаптируйте их под свой мир.',
    icon: <PenIcon />,
    image: customization
  },
  {
    title: 'Готово?',
    description: 'Добавляйте в свою кампанию и отправляйте игроков навстречу новым испытаниям!',
    icon: <DiceIcon />,
    image: ready
  }
];

export const creatures = [
  { image: creature, isManual: true },
  { image: creature, isManual: false },
  { image: creature, isManual: false },
  { image: creature, isManual: true },
  { image: creature, isManual: false },
  { image: creature, isManual: true }
];
