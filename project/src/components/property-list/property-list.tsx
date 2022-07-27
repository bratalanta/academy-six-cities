import { CardClassName } from '../../const';
import { Properties } from '../../types/property';
import PropertyCard from '../property-card/property-card';

type PropertyListProps = {
  properties: Properties;
  cardClassName: CardClassName;
  onCardMouseEnter?: (id: number) => void;
  onCardMouseLeave?: () => void;
}

export default function PropertyList({properties, cardClassName, onCardMouseEnter, onCardMouseLeave}: PropertyListProps): JSX.Element {

  return (
    <>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          cardClassName={cardClassName}
          onCardMouseEnter={onCardMouseEnter}
          onCardMouseLeave={onCardMouseLeave}
        />
      )
      )}
    </>
  );
}
