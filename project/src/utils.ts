import { ONE_STAR_PERCENTAGE } from './const';
import dayjs from 'dayjs';

export const getRatingPercentage = (rating: number): string => `${rating * ONE_STAR_PERCENTAGE}%`;

export const getHumanizedDate = (date: dayjs.ConfigType, format: string) => dayjs(date).format(format);
