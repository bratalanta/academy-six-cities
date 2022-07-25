import LocationItemList from '../../components/location-item-list/location-item-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import PropertyList from '../../components/property-list/property-list';
import UserProfile from '../../components/user-profile/user-profile';
import { CardClassName, MapContainerClassName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/action';
import { PropertyCity } from '../../types/property';

export default function MainScreen(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentProperties = useAppSelector((state) => state.properties)
    .filter(({city}) => currentCity.name === city.name);

  const dispatch = useAppDispatch();

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <UserProfile />
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <LocationItemList
                currentCity={currentCity}
                clickHandler={(city: PropertyCity) => dispatch(setCity(city))}
              />
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {currentProperties.length} places to stay in {currentCity.name}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <PropertyList properties={currentProperties} cardClassName={CardClassName.Cities}/>
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                containerClassName={MapContainerClassName.City}
                currentCity={currentCity}
                currentProperties={currentProperties}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
