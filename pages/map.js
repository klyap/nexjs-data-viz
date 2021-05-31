/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import {ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia2x5YXAiLCJhIjoiY2twYzJiMWhzMTMwODJybGFsZWF0MzgzdSJ9.6iuhyL5r0gE0OGGrJoTuxQ';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 9,
  pitch: 0,
  bearing: 0
};

const arcData =
  [
    {
      now: {
        name: 'San Francisco, CA, USA',
        coordinates: [-122.420160, 37.780080]
      },
      from: {
        name: 'Seattle, WA, USA',
        coordinates: [-122.332069, 47.606209, ]
      },
      parent1: {
        name: 'Kuala Lumpur, Selangor, Malaysia',
        coordinates: [101.698532, 2.748840]
      },
    },
    {
      now: {
        name: 'Seattle, WA, USA',
        coordinates: [-122.332069, 47.606209]
      },
      from: {
        name: 'Kuala Lumpur, Selangor, Malaysia',
        coordinates: [101.698532, 2.748840]
      },
    }
  ];

const arcLayer = new ArcLayer({
    id: 'arc-layer',
    data: arcData,
    pickable: true,
    getWidth: 6,
    getSourcePosition: d => d.now.coordinates,
    getTargetPosition: d => d.from.coordinates,
    getSourceColor: [0, 255, 0],
    getTargetColor: [255, 0, 0],
});

export default function App({data}) {
  const layers = [
    arcLayer
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({object}) => object && `${object.now.name} to ${object.from.name}`}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}