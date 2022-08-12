export type PropertyLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type PropertyCity = {
  location: PropertyLocation;
  name: string;
};

export type PropertyHost = {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
}

export type Property = {
  bedrooms: number;
  city: PropertyCity;
  description: string;
  goods: [string];
  host: PropertyHost;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: PropertyLocation;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type GroupedProperties = {
  [key: string]: Properties;
}

export type Properties = Property[];
export type PropertyCities = PropertyCity[];
