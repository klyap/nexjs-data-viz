/// app.js
import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import {ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import fire from '../lib/firebase-config';
import styles from './map.module.css';

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
// const arcData =
//   [
//     {
//       now: {
//         name: 'San Francisco, CA, USA',
//         coordinates: [-122.420160, 37.780080]
//       },
//       from: {
//         name: 'Seattle, WA, USA',
//         coordinates: [-122.332069, 47.606209 ]
//       },
//       parent1: {
//         name: 'Kuala Lumpur, Selangor, Malaysia',
//         coordinates: [101.698532, 2.748840]
//       },
//     },
//     {
//       now: {
//         name: 'Seattle, WA, USA',
//         coordinates: [-122.332069, 47.606209]
//       },
//       from: {
//         name: 'Kuala Lumpur, Selangor, Malaysia',
//         coordinates: [101.698532, 2.748840]
//       },
//     }
//   ];

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
      getSourceColor: [77, 255, 223],
      getTargetColor: [77, 161, 255],
      getHeight: 0.1,
      getTilt: 40,
  });

  const layers = [
    arcLayer
  ];

  return (
    <div className={styles.mapContainer}>
      <DeckGL
        width={'800px'}
        height={'600px'}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({object}) => object && {
          text: `${object.now.name} to ${object.from.name}`,
          style: {
            'background-color': 'rgba(255, 255, 255, 0.24)',
            'border-radius': '4px',
            'color': 'white'
          }
        }}
      >
        <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          mapStyle={'mapbox://styles/klyap/ckpf1xoa4079217qom1mbs1jg'}
        />
    </DeckGL>
    </div>
  );
}