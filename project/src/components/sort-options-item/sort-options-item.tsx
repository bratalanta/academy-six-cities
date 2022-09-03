import cn from 'classnames';
import { OptionValue } from '../../types/sort';

type SortOptionsItemProps = {
  option: OptionValue;
  activeSortOption: OptionValue;
  onOptionClick: (option: OptionValue) => void;
}

export default function SortOptionsItem({option, activeSortOption, onOptionClick}: SortOptionsItemProps): JSX.Element {
  const optionClassName = cn(
    'places__option',
    `${option === activeSortOption && 'places__option--active'}`
  );

  return (
    <li
      className={optionClassName}
      tabIndex={0}
      onClick={() => onOptionClick(option)}
      data-testid={'sort-change'}
    >
      {option}
    </li>
  );
}
