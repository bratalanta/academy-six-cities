import { CITIES } from '../../const';
import { PropertyCity } from '../../types/property';
import LocationItem from '../location-item/location-item';

type LocationItemListProps = {
  currentCity: PropertyCity;
}

export default function LocationItemList({currentCity}: LocationItemListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES
            .map((city) => (
              <LocationItem
                key={city.name}
                city={city}
                currentCity={currentCity}
              />
            )
            )}
        </ul>
      </section>
    </div>
  );
}
