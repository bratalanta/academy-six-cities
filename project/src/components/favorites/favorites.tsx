import { CardClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { getGroupedFavoriteProperties } from '../../store/favorite-slice/selectors';
import PropertyList from '../property-list/property-list';

export default function Favorites(): JSX.Element {
  const groupedProperties = useAppSelector(getGroupedFavoriteProperties);

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
