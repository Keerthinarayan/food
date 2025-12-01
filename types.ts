export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  rating: number;
  votes: number;
  restaurantId: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  priceForTwo: string;
  image: string;
  offers: string[];
  address: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface UserLocation {
  address: string;
  city: string;
}

export enum PaymentMethod {
  CARD = 'CARD',
  UPI = 'UPI',
  COD = 'COD'
}
