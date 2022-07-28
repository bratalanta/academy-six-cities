import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { setCity } from '../../store/action';
import { PropertyCity } from '../../types/property';

type LocationItemProps = {
  city: PropertyCity;
  currentCity: PropertyCity;
}

export default function LocationItem({city, currentCity}: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const locationClassName = cn(
    'locations__item-link tabs__item',
    `${currentCity.name === city.name && 'tabs__item--active'}`
  );

  return (
    <li className="locations__item">
      <a
        className={locationClassName}
        onClick={() => dispatch(setCity(city))}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
