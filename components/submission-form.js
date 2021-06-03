import React, { useState } from 'react';
import fire, {collectionName} from '../lib/firebase-config';
import styles from './submission-form.module.css'
import SubmissionPreview from './submission-preview';
import Image from 'next/image'

const SubmissionForm = () => {
  const [nowName, setNowName] = useState('');
  const [nowLat, setNowLat] = useState(null);
  const [nowLong, setNowLong] = useState(null);

  const [fromName, setFromName] = useState('');
  const [fromLat, setFromLat] = useState(null);
  const [fromLong, setFromLong] = useState(null);

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
            coordinates: [parseFloat(nowLat), parseFloat(nowLong)]
          },
          from: {
            name: fromName,
            coordinates: [parseFloat(fromLat), parseFloat(fromLong) ]
          },
          story: story
        }
      );

    setNowName('');
    setFromName('');

    setNotification('Story added!');
    setTimeout(() => {
      setNotification('')
    }, 2000)
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

                Where are you now?
                <br />
                <input placeholder="city, state, country" className={styles.input} type="text" value={nowName} onChange={({target}) => setNowName(target.value)} />
                <br />
                Lat
                <input className={styles.input} type="text" value={nowLat} onChange={({target}) => setNowLat(target.value)} />
                Long
                <input className={styles.input} type="text" value={nowLong} onChange={({target}) => setNowLong(target.value)} />

                <br />
                <br />
                Where are you from?
                <br />
                <input placeholder="city, state, country" className={styles.input} type="text" value={fromName} onChange={({target}) => setFromName(target.value)} />
                <br />
                Lat
                <input className={styles.input} type="text" value={fromLat} onChange={({target}) => setFromLat(target.value)} />
                Long
                <input className={styles.input} type="text" value={fromLong} onChange={({target}) => setFromLong(target.value)} />
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