import { SeedActions } from './actions.seed.ts';
import { SeedAlignment } from './alignment.seed.ts';
import { SeedBiomes } from './biomes.seed.ts';
import { SeedCR } from './cr.seed.ts';
import { SeedDamageType } from './damageType.seed.ts';
import { SeedLanguages } from './languages.seed.ts';
import { SeedSizes } from './size.seed.ts';
import { SeedSources } from './source.seed.ts';
import { SeedTypes } from './subtype.seed.ts';
import { SeedTraits } from './traits.seed.ts';

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
