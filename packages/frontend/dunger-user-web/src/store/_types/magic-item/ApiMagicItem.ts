export interface ApiMagicItem {
  name: string;
  description: string | null;
  rarity: {
    id: string;
    name: string;
  } | null;
  type: {
    id: string;
    name: string;
  } | null;
  cost: string | null;
  attunements: { id: string; name: string }[];
  requires_attunement: boolean;
}
