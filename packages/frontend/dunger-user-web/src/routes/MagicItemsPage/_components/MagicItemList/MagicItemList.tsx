import { Link } from 'react-router-dom';
import { Grid } from '@dunger/ui';
import { ApiMagicItemList } from 'store/_types/magic-item/ApiMagicItemList';
import { MagicItem } from '../MagicItem';

interface MagicItemListProps {
  isActiveItem?: boolean;

  magicItems: ApiMagicItemList;
}

export const MagicItemList = ({ isActiveItem, magicItems }: MagicItemListProps) => {
  return (
    <Grid gap={16} rowGap={8}>
      {magicItems.map((m) => (
        <Grid.Col span={isActiveItem ? 12 : 6} key={m.id}>
          <Link to={`/magic-items/${m.id.toString()}`} replace>
            <MagicItem name={m.name} />
          </Link>
        </Grid.Col>
      ))}
    </Grid>
  );
};
