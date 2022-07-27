import { useEffect, useRef, useState } from 'react';
import { SortOption } from '../../const';
import { Properties, PropertyCity } from '../../types/property';
import { OptionValue } from '../../types/sort';
import SortOptionItem from '../sort-option-item/sort-option-item';
import { sortByHighToLow, sortByLowToHigh, sortByTopRated } from './helper';

type SortOptionsProps = {
  currentProperties: Properties;
  currentCity: PropertyCity;
};

export default function SortOptions({ currentProperties, currentCity }: SortOptionsProps) {
  const [selectedSortOption, setSelectedSortOption] = useState<OptionValue>(SortOption.POPULAR);
  const sortListRef = useRef<HTMLUListElement>(null);

  useEffect(() => (
    () => setSelectedSortOption(SortOption.POPULAR)
  ), [currentCity]);

  const sortProperties = (option: OptionValue) => {
    switch (option) {
      case SortOption.HIGH_TO_LOW:
        return currentProperties.sort(sortByHighToLow);
      case SortOption.LOW_TO_HIGH:
        return currentProperties.sort(sortByLowToHigh);
      case SortOption.TOP_RATED:
        return currentProperties.sort(sortByTopRated);
      case SortOption.POPULAR:
        return currentProperties;
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
                setSelectedSortOption(value);
                sortProperties(value);
                sortListRef.current?.classList.remove('places__options--opened');
              }}
            />
          ))
        }
      </ul>
    </form>
  );
}
