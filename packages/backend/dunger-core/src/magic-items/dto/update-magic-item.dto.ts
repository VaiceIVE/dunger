export class UpdateMagicItemDto {
  name: string;
  description: string | null;
  type_id: string | null;
  rarity_id: string | null;
  requires_attunement: boolean;
  attunement_ids: string[];
}
