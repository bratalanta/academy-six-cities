import { SortOption } from '../../const';
import { Properties, Property } from '../../types/property';
import { OptionValue } from '../../types/sort';

export const sortByHighToLow = (a: Property, b: Property) => b.price - a.price;

export const sortByLowToHigh = (a: Property, b: Property) => a.price - b.price;

export const sortByTopRated = (a: Property, b: Property) => b.rating - a.rating;

export const getSortedProperties = (option: OptionValue, properties: Properties) => {
  switch (option) {
    case SortOption.HIGH_TO_LOW:
      return properties.sort(sortByHighToLow);
    case SortOption.LOW_TO_HIGH:
      return properties.sort(sortByLowToHigh);
    case SortOption.TOP_RATED:
      return properties.sort(sortByTopRated);
    case SortOption.POPULAR:
      return properties;
  }
};
