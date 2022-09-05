import { CITIES } from '../../const';
import LocationItem from '../location-item/location-item';

export default function LocationItemList(): JSX.Element {
  return (
    <div
      className="tabs"
      data-testid="tabs"
    >
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES
            .map((city) => (
              <LocationItem
                key={city.name}
                city={city}
              />
            )
            )}
        </ul>
      </section>
    </div>
  );
}
