import { CardClassName } from '../../const';
import { Properties } from '../../types/property';
import PropertyList from '../property-list/property-list';

type PropertiesNearbyProps = {
  properties: Properties
}

export default function PropertiesNearby({properties}: PropertiesNearbyProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <div className="near-places__list places__list">
          <PropertyList
            properties={properties}
            cardClassName={CardClassName.NearPlaces}
          />
        </div>
      </section>
    </div>
  );
}
