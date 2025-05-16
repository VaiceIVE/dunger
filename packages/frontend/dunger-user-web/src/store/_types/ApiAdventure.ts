export interface ApiAdventure {
  id: string;
  name: string;
  planned_parties: number;
  genre: {
    id: string;
    name: string;
  };
  keywords: {
    id: string;
    name: string;
    genre_id: string;
  }[];
  creator_id: string; // ID из Keycloak
  created_at: string;
  updated_at: string;
}
