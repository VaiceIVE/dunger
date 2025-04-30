import { SeedActions } from './actions.seed';
import { SeedAlignment } from './alignment.seed';
import { SeedBiomes } from './biomes.seed';
import { SeedCR } from './cr.seed';
import { SeedDamageType } from './damageType.seed';
import { SeedLanguages } from './languages.seed';
import { SeedSizes } from './size.seed';
import { SeedSources } from './source.seed';
import { SeedTypes } from './subtype.seed';
import { SeedTraits } from './traits.seed';

async function main() {
  await SeedAlignment();
  await SeedBiomes();
  await SeedSizes();
  await SeedSources();
  await SeedTypes();
  await SeedDamageType();
  await SeedCR();
  await SeedTraits();
  await SeedActions();
  await SeedLanguages();
}
main();
