/// app.js
import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import {ArcLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import fire, {collectionName} from '../lib/firebase-config';
import styles from './map.module.css';
import SubmissionPreview from './submission-preview';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoia2x5YXAiLCJhIjoiY2twYzJiMWhzMTMwODJybGFsZWF0MzgzdSJ9.6iuhyL5r0gE0OGGrJoTuxQ';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -10.016100,
  latitude: 39.591436,
  zoom: 0,
  pitch: 0,
  bearing: 0
};

export default function Map({data}) {
  const [journeys, setJourneys] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState({});

  useEffect(() => {
    fire.firestore()
      .collection(collectionName)
      .onSnapshot(snap => {
        const journeys = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJourneys(journeys);
      });
  }, []);

  const arcLayer = new ArcLayer({
      id: 'arc-layer',
      data: journeys,
      pickable: true,
      getWidth: 6,
      getSourcePosition: d => d.now.coordinates,
      getTargetPosition: d => d.from.coordinates,
      getSourceColor: [77, 255, 223],
      getTargetColor: [77, 161, 255],
      getHeight: 0.1,
      getTilt: 40,
  });

  return (
    <div>
      <h3> Where am I from? </h3>
      <div className={styles.flexContainer}>

        <div className={styles.mapContainer}>
          <DeckGL
            width={'600px'}
            height={'340px'}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            layers={[arcLayer]}
            onClick={(info, event) => {setSelectedJourney(info.object)}}
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
        <div className={styles.submissionPreview}>
          <SubmissionPreview showHelpText={!selectedJourney.from} fromName={selectedJourney.from?.name} nowName={selectedJourney.now?.name} story={selectedJourney.story} />
        </div>
      </div>
    </div>
  );
}