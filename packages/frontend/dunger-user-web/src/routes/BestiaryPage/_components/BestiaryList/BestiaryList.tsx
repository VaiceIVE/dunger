import { Link } from 'react-router-dom';
import { Grid } from '@dunger/ui';
import { ApiCreatureList } from 'store/_types/ApiCreatureList';
import { BestiaryItem } from '../BestiaryItem';

interface BestiaryListProps {
  isActiveCreature?: boolean;
  creatures: ApiCreatureList;
}

export const BestiaryList = ({ isActiveCreature, creatures }: BestiaryListProps) => {
  return (
    <Grid gap={16} rowGap={8}>
      {creatures.map((c) => (
        <Grid.Col span={isActiveCreature ? 12 : 6} key={c.id}>
          <Link to={`/bestiary/${c.id}`} replace>
            <BestiaryItem {...c} />
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  );
};
