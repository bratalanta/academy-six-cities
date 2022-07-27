import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SortOption } from '../../const';
import { Properties, PropertyCity } from '../../types/property';
import { OptionValue } from '../../types/sort';
import SortOptionItem from '../sort-option-item/sort-option-item';
import { sortByHighToLow, sortByLowToHigh, sortByTopRated } from './helper';

type SortOptionsProps = {
  sortedProperties: Properties;
  currentCity: PropertyCity;
  setSortedProperties: Dispatch<SetStateAction<Properties>>;
};

export default function SortOptions({ sortedProperties, currentCity, setSortedProperties }: SortOptionsProps) {
  const sortListRef = useRef<HTMLUListElement>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<OptionValue>(SortOption.POPULAR);

  useEffect(() => (
    () => setSelectedSortOption(SortOption.POPULAR)
  ), [currentCity]);

  const sortProperties = (option: OptionValue) => {
    const properties = [...sortedProperties];
    switch (option) {
      case SortOption.HIGH_TO_LOW:
        properties.sort(sortByHighToLow);
        return setSortedProperties(properties);
      case SortOption.LOW_TO_HIGH:
        properties.sort(sortByLowToHigh);
        return setSortedProperties(properties);
      case SortOption.TOP_RATED:
        properties.sort(sortByTopRated);
        return setSortedProperties(properties);
      case SortOption.POPULAR:
        return setSortedProperties(sortedProperties);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          sortListRef.current?.classList.toggle('places__options--opened');
        }}
      >
        {selectedSortOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className="places__options places__options--custom"
        ref={sortListRef}
      >
        {
          Object.values(SortOption).map((option) => (
            <SortOptionItem
              key={option}
              option={option}
              selectedSortOption={selectedSortOption}
              onSortOptionClick={(value: OptionValue) => {
                sortProperties(value);
                setSelectedSortOption(value);
                sortListRef.current?.classList.remove('places__options--opened');
              }}
            />
          ))
        }
      </ul>
    </form>
  );
}
