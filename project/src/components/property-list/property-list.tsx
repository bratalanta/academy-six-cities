import { CardClassName } from '../../const';
import { Properties } from '../../types/property';
import ActiveCardProvider from '../active-card-provider/active-card-provider';
import PropertyCard from '../property-card/property-card';

type PropertyListProps = {
  properties: Properties;
  cardClassName: CardClassName;
}

export default function PropertyList({properties, cardClassName}: PropertyListProps): JSX.Element {

  return (
    <>
      {properties.map((property) => (
        <ActiveCardProvider key={property.id}>
          <PropertyCard
            key={property.id}
            property={property}
            cardClassName={cardClassName}
          />
        </ActiveCardProvider>
      )
      )}
    </>
  );
}
