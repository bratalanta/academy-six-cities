import { CITIES, MAX_REVIEW_RATING } from './const';
import dayjs from 'dayjs';
import { Review } from './types/review';
import { PropertyCity } from './types/property';

export const getRatingPercentage = (rating: number): string => `${rating / MAX_REVIEW_RATING * 100 }%`;

export const getHumanizedDate = (date: dayjs.ConfigType, format: string) => dayjs(date).format(format);

export const sortReviewsByDate = (a: Review, b: Review) => dayjs(b.date).diff(dayjs(a.date));

export const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomCity = (): PropertyCity => CITIES[getRandomInteger(0, CITIES.length - 1)];

export const getCapitalizedWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
