"use client";

import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geo = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export function GlobeComponent() {
  return (
    <div>
      <ComposableMap>
        <ZoomableGroup center={[0, 0]} zoom={9}>
          <Geographies geography={geo}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
