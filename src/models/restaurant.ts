interface Location {
  id: number;
  locationName: string;
}

interface Category {
  id: number;
  categoryName: string;
}

interface Menu {
  id: number;
  menuName: string;
  price: string;
}

export interface Restaurant {
  id: number;
  restaurantName: string;
  location: Location;
  categories: Category[];
  menus: Menu[];
  imgDir: string;
  description: string;
}
