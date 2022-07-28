import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { SortOption } from '../../const';
import { useAppDispatch } from '../../hooks';
import { useOnClickOutside } from '../../hooks/use-outside-click';
import { setActiveSortOption } from '../../store/action';
import { PropertyCity } from '../../types/property';
import { OptionValue } from '../../types/sort';
import SortOptionItem from '../sort-options-item/sort-options-item';

type SortOptionsListProps = {
  activeSortOption: OptionValue;
  currentCity: PropertyCity;
};

export default function SortOptionsList({ activeSortOption, currentCity }: SortOptionsListProps) {
  const [isOptionsListOpened, setIsOptionsListOpened] = useState(false);
  const optionsListClassName = cn(
    'places__options places__options--custom',
    isOptionsListOpened && 'places__options--opened'
  );
  const sortRef = useRef(null);
  const dispatch = useAppDispatch();

  useOnClickOutside(sortRef, () => setIsOptionsListOpened(false));

  useEffect(() => (
    () => {
      setIsOptionsListOpened(false);
      dispatch(setActiveSortOption(SortOption.POPULAR));
    }
  ), [currentCity]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOptionsListOpened(!isOptionsListOpened)}
      >
        {activeSortOption}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={optionsListClassName} ref={sortRef}>
        {
          Object.values(SortOption).map((option) => (
            <SortOptionItem
              key={option}
              option={option}
              activeSortOption={activeSortOption}
              onOptionClick={(o: OptionValue) => {
                setIsOptionsListOpened(false);
                dispatch(setActiveSortOption(o));
              }}
            />
          ))
        }
      </ul>
    </form>
  );
}
