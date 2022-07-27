import { Cities } from '../../const';
import { PropertyCity } from '../../types/property';
import LocationItem from '../location-item/location-item';

type LocationItemListProps = {
  onLocationItemClick: (city: PropertyCity) => void;
  currentCity: PropertyCity;
}

export default function LocationItemList({currentCity, onLocationItemClick}: LocationItemListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities
            .map((city) => (
              <LocationItem
                key={city.name}
                city={city}
                currentCity={currentCity}
                onLocationItemClick={onLocationItemClick}
              />
            )
            )}
        </ul>
      </section>
    </div>
  );
}
