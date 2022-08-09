import LocationItemList from '../../components/location-item-list/location-item-list';
import Map from '../../components/map/map';
import PropertyList from '../../components/property-list/property-list';
import { CardClassName, MapContainerClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import SortOptionsList from '../../components/sort-options-list/sort-options-list';
import ErrorMessage from '../../components/error-message/error-message';
import Header from '../../components/header/header';
import { selectCurrentCity, selectCurrentSortOption } from '../../store/app-slice/selectors';
import { getMemoizedCurrentProperties, getPropertiesLoadingStatus } from '../../store/properties-slice/selectors';
import PrimaryLoader from '../../components/primary-loader/primary-loader';

export default function MainScreen(): JSX.Element {
  const currentCity = useAppSelector(selectCurrentCity);
  const activeSortOption = useAppSelector(selectCurrentSortOption);
  const {isPropertiesStatusPending, isPropertiesStatusRejected} = useAppSelector(getPropertiesLoadingStatus);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const {currentProperties, currentSortedProperties} = useAppSelector(getMemoizedCurrentProperties);

  if (isPropertiesStatusPending) {
    return (
      <PrimaryLoader />
    );
  }

  if (isPropertiesStatusRejected) {
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
