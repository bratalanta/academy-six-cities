import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../components/error-message/error-message';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import PrimaryLoader from '../../components/primary-loader/primary-loader';
import PropertiesNearby from '../../components/properties-nearby/properties-nearby';
import PropertyDetails from '../../components/property-details/property-details';
import { MapContainerClassName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPropertiesNearbyAction, fetchPropertyAction, fetchReviewsAction } from '../../store/api-actions';
import { getPropertyLoadingStatus, selectPropertiesNearby, selectProperty } from '../../store/properties-slice/selectors';

export default function PropertyScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyAction(+id));
      dispatch(fetchPropertiesNearbyAction(+id));
      dispatch(fetchReviewsAction(+id));
      window.scrollTo(0,0);
    }
  }, [id]);

  const property = useAppSelector(selectProperty);
  const propertiesNearby = useAppSelector(selectPropertiesNearby);
  const {isPropertyStatusPending, isPropertyStatusRejected} = useAppSelector(getPropertyLoadingStatus);

  if (isPropertyStatusPending || !property) {
    return (
      <PrimaryLoader />
    );
  }

  if (isPropertyStatusRejected) {
    return (
      <ErrorMessage />
    );
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <PropertyDetails property={property}/>
          <Map
            currentCity={property.city}
            properties={propertiesNearby.concat(property)}
            containerClassName={MapContainerClassName.Property}
            activeCardId={property.id}
          />
        </section>
        <PropertiesNearby properties={propertiesNearby}/>
      </main>
    </div>
  );
}
