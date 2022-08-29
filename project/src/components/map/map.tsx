import { Properties, PropertyCity } from '../../types/property';
import {useRef, useEffect, useContext} from 'react';
import {Marker, Icon, LayerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { MapContainerClassName } from '../../const';
import styles from '../map/map.module.css';
import { activeCardContext } from '../active-card-provider/active-card-provider';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconAnchor: [13.5, 39]
});

const activeCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconAnchor: [13.5, 39]
});

type MapProps = {
  currentCity: PropertyCity;
  properties: Properties;
  containerClassName: MapContainerClassName;
};

export default function Map({currentCity, properties, containerClassName}: MapProps): JSX.Element {
  const {location: cityLocation} = currentCity;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);
  const [activeCardId] = useContext(activeCardContext);

  useEffect(() => {
    if (map) {
      map.setView({
        lat: cityLocation.latitude,
        lng: cityLocation.longitude
      });
    }
  }, [map, cityLocation]);

  useEffect(() => {
    const layerGroup = new LayerGroup();

    if (map) {
      layerGroup.addTo(map);

      properties.forEach(({location: point, id}) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });
        marker.setIcon(id === activeCardId ? activeCustomIcon : defaultCustomIcon)
          .addTo(layerGroup);
      });
    }

    return () => {
      map?.removeLayer(layerGroup);
    };
  }, [map, properties, activeCardId]);

  return (
    <section
      className={`${containerClassName} map ${styles.container}`}
    >
      <div
        style={{height: '100%'}}
        ref={mapRef}
      />
    </section>
  );
}
