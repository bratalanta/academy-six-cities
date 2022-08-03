import LocationItemList from '../../components/location-item-list/location-item-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import PropertyList from '../../components/property-list/property-list';
import UserProfile from '../../components/user-profile/user-profile';
import { CardClassName, LOADER_COLOR, LOADER_SIZE, PropertiesLoadingStatus, MapContainerClassName } from '../../const';
import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import { getSortedProperties } from '../../components/sort-options-list/helper';
import SortOptionsList from '../../components/sort-options-list/sort-options-list';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from '../main-screen/main-screen.module.css';
import ErrorMessage from '../../components/error-message/error-message';
import { ToastContainer } from 'react-toastify';

export default function MainScreen(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const properties = useAppSelector((state) => state.properties);
  const activeSortOption = useAppSelector((state) => state.activeSortOption);
  const {propertiesLoadingStatus} = useAppSelector((state) => state);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const currentProperties = properties.filter(({city}) => currentCity.name === city.name);
  const currentSortedProperties = getSortedProperties(activeSortOption, currentProperties);

  if (propertiesLoadingStatus === PropertiesLoadingStatus.Pending) {
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader
          size={LOADER_SIZE}
          color={LOADER_COLOR}
        />
      </div>
    );
  }

  if (propertiesLoadingStatus === PropertiesLoadingStatus.Rejected) {
    return (
      <ErrorMessage />
    );
  }


  return (
    <>
      <ToastContainer />
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo />
              </div>
              <nav className="header__nav">
                <UserProfile />
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <LocationItemList currentCity={currentCity}/>
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
    </>
  );
}
