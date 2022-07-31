export const enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/room/:id'
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

export const MAX_REVIEW_RATING = 5;
