import { SeedActions } from './actions.seed.ts';
import { SeedAlignment } from './alignment.seed.ts';
import { SeedBiomes } from './biomes.seed.ts';
import { SeedCR } from './cr.seed.ts';
import { SeedCreatures } from './creatures.seed.ts';
import { SeedDamageType } from './damageType.seed.ts';
import { SeedLanguages } from './languages.seed.ts';
import { SeedRaces } from './races.seed.ts';
import { SeedSizes } from './size.seed.ts';
import { SeedSources } from './source.seed.ts';
import { SeedTypes } from './subtype.seed.ts';
import { SeedTraits } from './traits.seed.ts';

async function main() {
  SeedAlignment()
    .then(SeedBiomes)
    .then(SeedRaces)
    .then(SeedSizes)
    .then(SeedSources)
    .then(SeedTypes)
    .then(SeedDamageType)
    .then(SeedCR)
    .then(SeedTraits)
    .then(SeedActions)
    .then(SeedLanguages)
    .then(SeedCreatures);
}
main();
