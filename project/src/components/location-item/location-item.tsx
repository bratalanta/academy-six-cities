import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentCity } from '../../store/app-slice/app-slice';
import { selectCurrentCity } from '../../store/app-slice/selectors';
import { PropertyCity } from '../../types/property';

type LocationItemProps = {
  city: PropertyCity;
}

export default function LocationItem({city}: LocationItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCurrentCity);

  const locationClassName = cn(
    'locations__item-link tabs__item',
    `${currentCity.name === city.name && 'tabs__item--active'}`
  );

  return (
    <li className="locations__item">
      <a
        className={locationClassName}
        onClick={() => dispatch(setCurrentCity(city))}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}
