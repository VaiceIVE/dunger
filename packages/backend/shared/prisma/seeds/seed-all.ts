import { SeedActions } from "./actions.seed";
import { SeedAlignment } from "./alignment.seed";
import { SeedBiomes } from "./biomes.seed";
import { SeedCR } from "./cr.seed";
import { SeedCreatures } from "./creatures.seed";
import { SeedDamageType } from "./damageType.seed";
import { SeedLanguages } from "./languages.seed";
import { SeedRaces } from "./races.seed";
import { SeedSizes } from "./size.seed";
import { SeedSources } from "./source.seed";
import { SeedTypes } from "./subtype.seed";
import { SeedTraits } from "./traits.seed";

async function main(){
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
    .then(SeedCreatures)

}
main();