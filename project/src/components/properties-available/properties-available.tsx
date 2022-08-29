import { CardClassName, MapContainerClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectCurrentCity, selectCurrentSortOption } from '../../store/app-slice/selectors';
import { getCurrentSortedProperties } from '../../store/properties-slice/selectors';
import { Properties } from '../../types/property';
import ActiveCardProvider from '../active-card-provider/active-card-provider';
import Map from '../map/map';
import PropertyList from '../property-list/property-list';
import SortOptionsList from '../sort-options-list/sort-options-list';

type PropertiesAvailableProps = {
  currentProperties: Properties;
}

export default function PropertiesAvailable({currentProperties}: PropertiesAvailableProps): JSX.Element {
  const currentCity = useAppSelector(selectCurrentCity);
  const activeSortOption = useAppSelector(selectCurrentSortOption);
  const currentSortedProperties = useAppSelector(getCurrentSortedProperties);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {currentProperties.length} places to stay in {currentCity.name}
        </b>
        <SortOptionsList
          currentCity={currentCity}
          activeSortOption={activeSortOption}
        />
        <div className="cities__places-list places__list tabs__content">
          <PropertyList
            properties={currentSortedProperties}
            cardClassName={CardClassName.Cities}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <ActiveCardProvider>
          <Map
            containerClassName={MapContainerClassName.City}
            currentCity={currentCity}
            properties={currentProperties}
          />
        </ActiveCardProvider>
      </div>
    </div>
  );
}
