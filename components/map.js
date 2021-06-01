/// app.js
import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import {ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import fire from '../lib/firebase-config';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia2x5YXAiLCJhIjoiY2twYzJiMWhzMTMwODJybGFsZWF0MzgzdSJ9.6iuhyL5r0gE0OGGrJoTuxQ';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -41.016100,
  latitude: 39.591436,
  zoom: 1,
  pitch: 0,
  bearing: 0
};

// Sample data
const arcData =
  [
    {
      now: {
        name: 'San Francisco, CA, USA',
        coordinates: [-122.420160, 37.780080]
      },
      from: {
        name: 'Seattle, WA, USA',
        coordinates: [-122.332069, 47.606209 ]
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



export default function Map({data}) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  const arcLayer = new ArcLayer({
      id: 'arc-layer',
      data: blogs,
      pickable: true,
      getWidth: 6,
      getSourcePosition: d => d.now.coordinates,
      getTargetPosition: d => d.from.coordinates,
      getSourceColor: [0, 255, 0],
      getTargetColor: [255, 0, 0],
      getHeight: 0.1,
      getTilt: 40,
  });

  const layers = [
    arcLayer
  ];

  return (
    <DeckGL
      width={'400px'}
      height={'400px'}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({object}) => object && `${object.now.name} to ${object.from.name}`}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}