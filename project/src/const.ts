export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/room/:id',
  NotFound = '*'
}

export const enum APIRoute {
  Properties = '/hotels',
  Favorites = '/favorite',
  Reviews = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum CardClassName {
  Favorites = 'favorites',
  Cities = 'cities',
  NearPlaces = 'near-places'
}

export const CardImageSize = {
  favorites: {
    width: 150,
    height: 110
  },
  cities: {
    width: 260,
    height: 200
  },
  'near-places': {
    width: 260,
    height: 200
  }
} as const;

const zoom = 10;

export const DEFAULT_CITY = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom
  }
} as const;

export const CITIES = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom
    }
  }
] as const;

type Ratings = readonly [number, string][];

export const RATINGS: Ratings = [
  [5, 'perfect'],
  [4, 'good'],
  [3, 'not bad'],
  [2, 'badly'],
  [1, 'terribly']
];

export const enum MapContainerClassName {
  City = 'cities__map',
  Property = 'property__map'
}

export const SortOption = {
  POPULAR: 'Popular',
  TOP_RATED: 'Top rated first',
  LOW_TO_HIGH: 'Price: low to high',
  HIGH_TO_LOW: 'Price: high to low'
} as const;

export const enum LoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected'
}

export const enum NameSpace {
  Auth = 'authorization',
  Properties = 'hotels',
  Reviews = 'comments',
  App = 'app',
  Favorites = 'favorite'
}

export const MAX_REVIEW_RATING = 5;
export const REVIEWS_LIMIT = 10;

export const Loader = {
  Primary: {
    size: 150,
    color: '#4481c3'
  },
  Button: {
    size: 5,
    color: '#FFFFFF'
  },
  Logout: {
    size: 10,
    color: '#616161'
  },

} as const;

export const MAX_IMAGES_COUNT = 6;
