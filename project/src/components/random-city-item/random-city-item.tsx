import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setCurrentCity } from '../../store/app-slice/app-slice';
import { getRandomCity } from '../../utils/utils';

export default function RandomCityItem() {
  const dispatch = useAppDispatch();
  const randomCity = getRandomCity();

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoute.Main}
          onClick={() => dispatch(setCurrentCity(randomCity))}
        >
          <span>{randomCity.name}</span>
        </Link>
      </div>
    </section>
  );
}
