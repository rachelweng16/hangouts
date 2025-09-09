'use client';

import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapView: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);

  // Replace with your actual values
const apiKey = process.env.NEXT_PUBLIC_AMAZON_LOCATION_API_KEY!;
const region = process.env.NEXT_PUBLIC_AWS_REGION || "ca-central-1";
const style = process.env.NEXT_PUBLIC_MAP_STYLE || "Standard";
const colorScheme = process.env.NEXT_PUBLIC_COLOR_SCHEME || "Light";

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://maps.geo.${region}.amazonaws.com/v2/styles/${style}/descriptor?key=${apiKey}&color-scheme=${colorScheme}`,
        center: [-123.115898, 49.295868], // Vancouver; TODO: change to input coords / user coords
        zoom: 11,
      });

      mapInstance.current.addControl(new maplibregl.NavigationControl(), "top-left");
    }

    // Cleanup on unmount
    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: "100vh", width: "100%", margin: 0, padding: 0 }}
    />
  );
};

export default MapView;
