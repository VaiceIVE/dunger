import * as stylex from '@stylexjs/stylex';
import { BatIcon, BeachIcon, BrandNetbeansIcon, Flex, Folder, WandIcon } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';
import { KeyValue } from 'components/KeyValue';

interface AdventureMaterialsProps {
  creaturesCount?: number;
}

export const AdventureMaterials = ({ creaturesCount }: AdventureMaterialsProps) => {
  return (
    <Flex gap={16}>
      <Folder>
        <div {...stylex.props(styles.folderIcon(colors.brand80, colors.orange10))}>
          <BeachIcon />
        </div>
        <KeyValue keyLabel="Локации:" value={'-'} />
      </Folder>
      <Folder>
        <div {...stylex.props(styles.folderIcon(colors.blue80, colors.blue20))}>
          <BrandNetbeansIcon />
        </div>
        <KeyValue keyLabel="Энкаунтеры:" value="-" />
      </Folder>
      <Folder>
        <div {...stylex.props(styles.folderIcon(colors.red60, colors.red5))}>
          <BatIcon />
        </div>
        <KeyValue keyLabel="Существа:" value={creaturesCount ?? '-'} />
      </Folder>
      <Folder>
        <div {...stylex.props(styles.folderIcon(colors.purple70, colors.purple20))}>
          <WandIcon />
        </div>
        <KeyValue keyLabel="Предметы:" value="-" />
      </Folder>
    </Flex>
  );
};

const styles = stylex.create({
  folderIcon: (color: string, backgroundColor: string) => ({
    alignItems: 'center',
    backgroundColor,
    borderRadius: 8,
    color,
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    width: 32
  })
});
