import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import PropertyList from '../../components/property-list/property-list';
import { CardClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectPropeties } from '../../store/properties-slice/selectors';
import { GroupedProperties } from '../../types/property';

export default function FavoritesScreen(): JSX.Element {
  const favoriteProperties = useAppSelector(selectPropeties)
    .filter(({isFavorite}) => isFavorite);

  const groupedProperties = favoriteProperties.reduce<GroupedProperties>(
    (acc, property) => {
      const {city} = property;

      if (!acc[city.name]) {
        acc[city.name] = [];
      }

      acc[city.name].push(property);

      return acc;
    }, {});

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groupedProperties).map(([city, properties]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    <PropertyList properties={properties} cardClassName={CardClassName.Favorites}/>
                  </div>
                </li>
              )
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}
