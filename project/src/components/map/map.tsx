import { Properties, PropertyCity } from '../../types/property';
import {useRef, useEffect} from 'react';
import {Marker, Icon, LayerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { MapContainerClassName } from '../../const';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconAnchor: [19.5, 39]
});

type MapProps = {
  currentCity: PropertyCity;
  currentProperties: Properties;
  containerClassName: MapContainerClassName;
};

export default function Map({currentCity, currentProperties, containerClassName}: MapProps): JSX.Element {
  const {location: cityLocation} = currentCity;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

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

      currentProperties.forEach(({location: point}) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });
        marker.setIcon(defaultCustomIcon)
          .addTo(layerGroup);
      });
    }

    return () => {
      map?.removeLayer(layerGroup);
    };
  }, [map, currentProperties]);

  return (
    <section
      className={`${containerClassName} map`}
      style={{height: '100%'}}
      ref={mapRef}
    />
  );
}
