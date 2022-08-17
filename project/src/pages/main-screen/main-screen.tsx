import LocationItemList from '../../components/location-item-list/location-item-list';
import { useAppSelector } from '../../hooks';
import ErrorMessage from '../../components/error-message/error-message';
import Header from '../../components/header/header';
import { getCurrentFilteredProperties, getPropertiesLoadingStatus } from '../../store/properties-slice/selectors';
import PrimaryLoader from '../../components/primary-loader/primary-loader';
import PropertiesAvailable from '../../components/properties-available/properties-available';
import NoProperties from '../../components/no-properties/no-properties';

export default function MainScreen(): JSX.Element {
  const {isPropertiesStatusPending, isPropertiesStatusRejected} = useAppSelector(getPropertiesLoadingStatus);
  const currentProperties = useAppSelector(getCurrentFilteredProperties);

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
          {
            currentProperties.length ?
              <PropertiesAvailable currentProperties={currentProperties}/>
              :
              <NoProperties />
          }
        </div>
      </main>
    </div>
  );
}
