import { Link } from 'react-router-dom';
import { Grid } from '@dunger/ui';
import { BestiaryItem } from '../BestiaryItem';

const data = [
  {
    id: 1,
    name: 'Монстр'
  },
  {
    id: 2,
    name: 'Монстр'
  },
  {
    id: 3,
    name: 'Монстр'
  },
  {
    id: 4,
    name: 'Монстр'
  }
];

interface BestiaryListProps {
  isActiveCreature?: boolean;
}

export const BestiaryList = ({ isActiveCreature }: BestiaryListProps) => {
  return (
    <Grid gap={16} rowGap={8}>
      {data.map((m) => (
        <Grid.Col span={isActiveCreature ? 12 : 6} key={m.id}>
          <Link to={`/bestiary/${m.id.toString()}`} replace>
            <BestiaryItem />
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  );
};
