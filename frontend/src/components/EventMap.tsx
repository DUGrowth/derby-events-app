import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Event } from '../types/Event';

interface EventMapProps {
  events: Event[];
  onSelect?: (event: Event) => void;
}

const DERBY_CENTER: [number, number] = [-1.4767, 52.9225];

export const EventMap = ({ events, onSelect }: EventMapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN || '';
    mapboxgl.accessToken = token;

    if (!mapContainer.current || mapRef.current) {
      return;
    }

    if (!token) {
      mapContainer.current.innerHTML = '<div class=\"flex h-full items-center justify-center rounded-2xl bg-white/70 text-sm text-slate\">Add VITE_MAPBOX_TOKEN to enable the map.</div>';
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: DERBY_CENTER,
      zoom: 11.5
    });

    map.addControl(new mapboxgl.NavigationControl());
    mapRef.current = map;

    map.on('load', () => {
      map.addSource('events', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        },
        cluster: true,
        clusterRadius: 50
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'events',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#FF6B4A',
          'circle-radius': ['step', ['get', 'point_count'], 16, 10, 20, 30, 26]
        }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'events',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 12
        },
        paint: {
          'text-color': '#FFFFFF'
        }
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'events',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#2A9D8F',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      map.on('click', 'unclustered-point', (event) => {
        const feature = event.features?.[0];
        const id = feature?.properties?.id;
        if (!id) {
          return;
        }
        const matched = events.find((item) => item.id === Number(id));
        if (matched) {
          onSelect?.(matched);
        }
      });

      map.on('click', 'clusters', (event) => {
        const features = map.queryRenderedFeatures(event.point, { layers: ['clusters'] });
        const clusterId = features[0]?.properties?.cluster_id;
        const source = map.getSource('events') as mapboxgl.GeoJSONSource | undefined;
        source?.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const [lng, lat] = (features[0].geometry as any).coordinates as [number, number];
          map.easeTo({ center: [lng, lat], zoom });
        });
      });

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [events, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const features = events
      .filter((event) => event.longitude && event.latitude)
      .map((event) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [Number(event.longitude), Number(event.latitude)]
        },
        properties: {
          id: event.id,
          title: event.title
        }
      }));

    const source = map.getSource('events') as mapboxgl.GeoJSONSource | undefined;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features
      });
    }
  }, [events]);

  return <div ref={mapContainer} className="map-container" />;
};
