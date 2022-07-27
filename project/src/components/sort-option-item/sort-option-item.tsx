import cn from 'classnames';
import { OptionValue } from '../../types/sort';

type SortOptionItemProps = {
  option: OptionValue;
  selectedSortOption: OptionValue;
  onSortOptionClick: (option: OptionValue) => void;
}

export default function SortOptionItem({option, selectedSortOption, onSortOptionClick}: SortOptionItemProps): JSX.Element {
  const optionClassName = cn(
    'places__option',
    `${option === selectedSortOption && 'places__option--active'}`
  );

  return (
    <li
      className={optionClassName}
      tabIndex={0}
      onClick={() => onSortOptionClick(option)}
    >
      {option}
    </li>
  );
}
