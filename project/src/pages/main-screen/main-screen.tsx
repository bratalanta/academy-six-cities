import LocationItemList from '../../components/location-item-list/location-item-list';
import Map from '../../components/map/map';
import PropertyList from '../../components/property-list/property-list';
import { CardClassName, LOADER_COLOR, LOADER_SIZE, LoadingStatus, MapContainerClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { getSortedProperties } from '../../components/sort-options-list/helper';
import SortOptionsList from '../../components/sort-options-list/sort-options-list';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from '../main-screen/main-screen.module.css';
import ErrorMessage from '../../components/error-message/error-message';
import Header from '../../components/header/header';
import { selectCurrentCity, selectCurrentSortOption } from '../../store/app-slice/selectors';
import { selectPropeties, selectPropetiesLoadingStatus } from '../../store/properties-slice/selectors';

export default function MainScreen(): JSX.Element {
  const currentCity = useAppSelector(selectCurrentCity);
  const properties = useAppSelector(selectPropeties);
  const activeSortOption = useAppSelector(selectCurrentSortOption);
  const propertiesLoadingStatus = useAppSelector(selectPropetiesLoadingStatus);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const currentProperties = properties.filter(({city}) => currentCity.name === city.name);
  const currentSortedProperties = getSortedProperties(activeSortOption, currentProperties);

  if (propertiesLoadingStatus === LoadingStatus.Pending) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader
          size={LOADER_SIZE}
          color={LOADER_COLOR}
        />
      </div>
    );
  }

  if (propertiesLoadingStatus === LoadingStatus.Rejected) {
    return (
      <ErrorMessage />
    );
  }


  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationItemList />
        <div className="cities">
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
                  onCardMouseEnter={(id: number) => setActiveCardId(id)}
                  onCardMouseLeave={() => setActiveCardId(null)}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                containerClassName={MapContainerClassName.City}
                currentCity={currentCity}
                properties={currentProperties}
                activeCardId={activeCardId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
