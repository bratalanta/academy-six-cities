import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import { PropertyLocation } from '../types/property';

const MAP_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: PropertyLocation
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude
        },
        zoom: location.zoom
      });

      const layer = new TileLayer(
        MAP_LAYER,
        {
          attribution: MAP_ATTRIBUTION
        });

      instance.addLayer(layer);
      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [location, mapRef]);

  return map;
}

export default useMap;
