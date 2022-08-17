import { CardClassName } from '../../const';
import { GroupedProperties, Properties } from '../../types/property';
import PropertyList from '../property-list/property-list';

type FavoritesProps = {
  favoriteProperties: Properties;
}

export default function Favorites({favoriteProperties}: FavoritesProps): JSX.Element {
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
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(groupedProperties).map(([city, properties]) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link">
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
  );
}
