"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://utfs.io/f/942c1a83-a65d-493f-94ea-52b52dcb1b07-fqifry.json";

interface GeoProperties {
  NAME: string;
  NAME_LONG: string;
  NAME_EN?: string;
}

interface Country {
  country_id: number;
  name: string;
  flag_url: string;
}

interface MapWrapperProps {
  guessedCountries: Country[];
}

export function MapWrapper({ guessedCountries }: MapWrapperProps) {
  const isCountryGuessed = (geo: { properties: GeoProperties }) => {
    return guessedCountries.some(
      (country) =>
        country.name.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
          geo.properties.NAME.toLowerCase().replace(/[^a-zA-Z]/g, "") ||
        country.name.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
          geo.properties.NAME_LONG.toLowerCase().replace(/[^a-zA-Z]/g, "") ||
        country.name.toLowerCase().replace(/[^a-zA-Z]/g, "") ===
          geo.properties.NAME_EN?.toLowerCase().replace(/[^a-zA-Z]/g, ""),
    );
  };

  return (
    <ComposableMap className="border">
      <ZoomableGroup center={[0, 0]} minZoom={1} maxZoom={50}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const guessed = isCountryGuessed(
                geo as { properties: GeoProperties },
              );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={guessed ? "#E6A50E" : "#808080"}
                  stroke="#000000"
                  strokeWidth={0.15}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
