import { Cities } from '../../const';
import { PropertyCity } from '../../types/property';
import LocationItem from '../location-item/location-item';

type LocationItemListProps = {
  clickHandler: (city: PropertyCity) => void;
  currentCity: PropertyCity;
}

export default function LocationItemList({currentCity, clickHandler}: LocationItemListProps): JSX.Element {
  return (
    <>
      {Cities
        .map((city) => (
          <LocationItem
            key={city.name}
            city={city}
            currentCity={currentCity}
            clickHandler={clickHandler}
          />
        )
        )}
    </>
  );
}
