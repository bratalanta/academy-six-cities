import cn from 'classnames';
import { PropertyCity } from '../../types/property';

type LocationItemProps = {
  city: PropertyCity;
  onLocationItemClick: (city: PropertyCity) => void;
  currentCity: PropertyCity;
}

export default function LocationItem({city, currentCity, onLocationItemClick}: LocationItemProps): JSX.Element {
  const locationClassName = cn(
    'locations__item-link tabs__item',
    `${currentCity.name === city.name && 'tabs__item--active'}`
  );

  return (
    <li className="locations__item">
      <a
        className={locationClassName}
        onClick={() => onLocationItemClick(city)}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
