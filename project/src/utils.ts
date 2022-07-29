import { ONE_STAR_PERCENTAGE } from './const';
import dayjs from 'dayjs';
import { Review } from './types/review';

export const getRatingPercentage = (rating: number): string => `${rating * ONE_STAR_PERCENTAGE}%`;

export const getHumanizedDate = (date: dayjs.ConfigType, format: string) => dayjs(date).format(format);

export const sortReviewsByDate = (a: Review, b: Review) => dayjs(b.date).diff(dayjs(a.date));
