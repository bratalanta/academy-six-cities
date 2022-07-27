import { Price, Rating } from '../../types/property';

export const sortByHighToLow = ({price: priceA}: Price, {price: priceB}: Price) => priceB - priceA;

export const sortByLowToHigh = ({price: priceA}: Price, {price: priceB}: Price) => priceA - priceB;

export const sortByTopRated = ({rating: ratingA}: Rating, {rating: ratingB}: Rating) => ratingB - ratingA;
