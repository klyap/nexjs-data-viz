import React, { useState } from 'react';
import fire, {collectionName} from '../lib/firebase-config';
import styles from './submission-form.module.css'
import SubmissionPreview from './submission-preview';
import Image from 'next/image'
import AutoComplete from "react-google-autocomplete";

const GOOGLE_MAPS_API_KEY='AIzaSyAb7iUMq2uj1FspzVhKEHRFNZG97pic5Vg';

const SubmissionForm = () => {
  const [nowName, setNowName] = useState('');
  const [nowCoord, setNowCoord] = useState(null);

  const [fromName, setFromName] = useState('');
  const [fromCoord, setFromCoord] = useState(null);

  const [story, setStory] = useState('');

  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection(collectionName)
      .add(
        {
          now: {
            name: nowName,
            coordinates: nowCoord
          },
          from: {
            name: fromName,
            coordinates: fromCoord
          },
          story: story
        }
      );

    setNowName('');
    setFromName('');
    setStory('');

    setNotification('Story added!');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }

  const handleSelectPlace = (setCoord, setName, place) => {
    setCoord([place.geometry.location.lng(), place.geometry.location.lat()]);
    setName(place.formatted_address);
  }
  return (
    <div>
    <br/>
    <h3>Let us know your story!</h3>
    <form onSubmit={handleSubmit}>
    <div className={styles.flexContainer}>
      <div>
          <div className={styles.formContainer}>
            <div className={styles.flexContainer}>
              <div className={styles.flexItemLeft}>
                <div className={styles.avatar}><Image src={'/images/avatar.png'} height='80px'width='80px'/></div>
                Where are you now?
                <br />
                <AutoComplete
                  apiKey={GOOGLE_MAPS_API_KEY}
                  onPlaceSelected={place => handleSelectPlace(setNowCoord, setNowName, place)}
                />
                <br /><br />

                Where are you from?
                <br />
                <AutoComplete
                  apiKey={GOOGLE_MAPS_API_KEY}
                  onPlaceSelected={place => handleSelectPlace(setFromCoord, setFromName, place)}
                />
                <br />

              </div>

              <div className={styles.flexItemRight}>
                Share your story with us!
                <br />
                <textarea className={styles.longInput} type="text" value={story} onChange={({target}) => setStory(target.value)} />
              </div>
            </div>
          </div>

        </div>
        <div className={styles.submissionPreview}>
          <SubmissionPreview fromName={fromName} nowName={nowName} story={story}/>
          <button className={styles.submitButton} type="submit">
            <div className={styles.submitButtonContent}>
              {notification ? notification : 'SUBMIT'}
            </div>
          </button>
        </div>
      </div>
      </form>
      </div>
  )
}

export default SubmissionForm;