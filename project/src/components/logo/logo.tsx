import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Logo() {
  return (
    <div className="header__left" data-testid={'logo'}>
      <Link
        className="header__logo-link"
        to={AppRoute.Main}
        data-testid={'logo-link'}
      >
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
        />
      </Link>
    </div>
  );
}
