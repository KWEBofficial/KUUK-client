interface Restaurant {
  id: number;
  restaurantName: string;
  imgDir?: string;
  description: string;
}

export default interface Candidate {
  id: number;
  restaurant: Restaurant;
}
