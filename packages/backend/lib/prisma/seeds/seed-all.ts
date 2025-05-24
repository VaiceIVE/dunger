import { SeedActions } from './actions.seed.ts';
import { SeedAlignment } from './alignment.seed.ts';
import { SeedBiomes } from './biomes.seed.ts';
import { SeedCR } from './cr.seed.ts';
import { SeedCreatures } from './creatures.seed.ts';
import { SeedDamageType } from './damageType.seed.ts';
import { SeedGenreKeywords } from './genre-keywords.seed.ts';
import { SeedLanguages } from './languages.seed.ts';
import { SeedAttunementConditions } from './magic-item/attunement-conditions.seed.ts';
import { SeedMagicItemTypes } from './magic-item/magic-item-types.seed.ts';
import { SeedMagicItems } from './magic-item/magic-items.sees.ts';
import { SeedRarities } from './magic-item/rarities.seed.ts';
import { SeedRaces } from './races.seed.ts';
import { SeedSizes } from './size.seed.ts';
import { SeedSkills } from './skills.seed.ts';
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
    .then(SeedSkills)
    .then(SeedTraits)
    .then(SeedActions)
    .then(SeedLanguages)
    .then(SeedCreatures)
    .then(SeedGenreKeywords)
    .then(SeedRarities)
    .then(SeedMagicItemTypes)
    .then(SeedAttunementConditions)
    .then(SeedMagicItems);
}
main();
