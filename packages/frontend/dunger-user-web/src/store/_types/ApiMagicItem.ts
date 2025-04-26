export interface ApiMagicItem {
  name: string;
  description: string;
  rarity_name: string; //прeдполагается, что справочник и еще есть id
  source_name: string; //прeдполагается, что справочник и еще есть id
  price: string;
  setup: {} | null; // тут надо посмотреть какие там еще доп поля нужны - (кто, и может еще что)
  // перезарядка? или это в тексте, ну еще мб из фильтров ттг что-то вытащить
}
