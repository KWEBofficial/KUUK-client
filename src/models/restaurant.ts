interface Location {
  id: number;
  locationName: string;
}

interface Category {
  id: number;
  categoryName: string;
}

export interface Restaurant {
  id: number;
  restaurantName: string;
  location: Location;
  categories: Category[];
  img_dir: string;
  description: string;
}
