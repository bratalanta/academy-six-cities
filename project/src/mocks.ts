import { Property, PropertyCity, PropertyHost, PropertyLocation } from './types/property';
import faker from 'faker';
import { UserData } from './types/user-data';
import { MAX_IMAGES_COUNT, MAX_REVIEW_RATING } from './const';
import { Review } from './types/review';

const MAX_TEST_ID = 10;

export const makeFakeReview = (): Review => ({
  comment: faker.datatype.string(),
  date: String(faker.datatype.datetime),
  id: faker.datatype.number(),
  rating: faker.datatype.number(MAX_REVIEW_RATING),
  user: makeFakeHost()
});

export const makeFakeLocation = (): PropertyLocation => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number()
});

export const makeFakeCity = (): PropertyCity => ({
  location: makeFakeLocation(),
  name: String(faker.address.cityName())
});

export const makeFakeUserData = (): UserData => ({
  avatarUrl: faker.internet.url(),
  email: faker.internet.email(),
  id: faker.datatype.number(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
  token: faker.datatype.string()
});

export const makeFakeHost = (): PropertyHost => ({
  avatarUrl: faker.datatype.string(),
  id: faker.datatype.number(),
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
});

export const makeFakeProperty = (): Property => ({
  bedrooms: faker.datatype.number(),
  city: makeFakeCity(),
  description: faker.datatype.string(),
  goods: [faker.datatype.string()],
  host: makeFakeHost(),
  id: faker.datatype.number(MAX_TEST_ID),
  images: new Array(MAX_IMAGES_COUNT).fill(null)
    .map(() => faker.datatype.string()),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: faker.datatype.number(),
  previewImage: faker.datatype.string(),
  price: faker.datatype.number(),
  rating: faker.datatype.number(MAX_REVIEW_RATING),
  title: faker.datatype.string(),
  type: faker.datatype.string()
});
