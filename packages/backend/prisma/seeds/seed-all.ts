import { SeedAlignment } from "./alignment.seed";
import { SeedBiomes } from "./biomes.seed";
import { SeedDamageType } from "./damageType.seed";
import { SeedRaces } from "./races.seed";
import { SeedSizes } from "./size.seed";
import { SeedSources } from "./source.seed";
import { SeedTypes } from "./subtype.seed";

async function main(){
    await SeedAlignment()
    await SeedBiomes()
    await SeedRaces()
    await SeedSizes()
    await SeedSources()
    await SeedTypes()
    await SeedDamageType()
}
main();