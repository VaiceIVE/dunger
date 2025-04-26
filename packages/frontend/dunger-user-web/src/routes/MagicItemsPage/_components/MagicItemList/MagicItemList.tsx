import { Link } from 'react-router-dom';
import { Grid } from '@dunger/ui';
import { MagicItem } from '../MagicItem';

const data = [
  {
    id: 1,
    name: 'Свиток,  «Ледяной луч»'
  },
  {
    id: 2,
    name: 'Свиток, «Огненный снаряд»'
  },
  {
    id: 3,
    name: 'Свиток, «Пробирающий до костей холод»'
  },
  {
    id: 4,
    name: 'Свиток, «Шоковое прикосновение»'
  }
];

interface MagicItemListProps {
  isActiveItem?: boolean;
}

export const MagicItemList = ({ isActiveItem }: MagicItemListProps) => {
  return (
    <Grid gap={16} rowGap={8}>
      {data.map((m) => (
        <Grid.Col span={isActiveItem ? 12 : 6} key={m.id}>
          <Link to={`/magic-items/${m.id.toString()}`} replace>
            <MagicItem name={m.name} />
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  );
};
