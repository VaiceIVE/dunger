import { ActionDTO } from "./action.dto"
import { TraitDTO } from "./trait.dto"

export class SubtypeDTO{
    name: string
    description: string
    actions?: ActionDTO
    traits?: TraitDTO
}