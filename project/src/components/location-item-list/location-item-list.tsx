import { Cities } from '../../const';
import { PropertyCity } from '../../types/property';
import LocationItem from '../location-item/location-item';

type LocationItemListProps = {
  onClick: (city: PropertyCity) => void;
  currentCity: PropertyCity;
}

export default function LocationItemList({onClick, currentCity}: LocationItemListProps): JSX.Element {

  return (
    <>
      {Cities
        .map((city) => (
          <LocationItem
            key={city.name}
            city={city}
            onClick={onClick}
            currentCity={currentCity}
          />
        )
        )}
    </>
  );
}
