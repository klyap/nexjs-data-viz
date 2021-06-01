import React, { useState } from 'react';
import fire from '../lib/firebase-config';

const SubmissionFrom = () => {
  const [nowName, setNowName] = useState('');
  const [nowLat, setNowLat] = useState(0);
  const [nowLong, setNowLong] = useState(0);

  const [fromName, setFromName] = useState('');
  const [fromLat, setFromLat] = useState(0);
  const [fromLong, setFromLong] = useState(0);

  const [notification, setNotification] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore()
      .collection('blog')
      .add(
        {
          now: {
            name: nowName,
            coordinates: [parseFloat(nowLat), parseFloat(nowLong)]
          },
          from: {
            name: fromName,
            coordinates: [parseFloat(fromLat), parseFloat(fromLong) ]
          }
        }
      );

    setNowName('');

    setNotification('Blogpost created');
    setTimeout(() => {
      setNotification('')
    }, 2000)
  }
  return (
    <div>
      <h2>Add your journey</h2>

      {notification}

      <form onSubmit={handleSubmit}>
        <div>
          <br />
          Where are you now?
          <br />
          City, state, country
          <input type="text" value={nowName} onChange={({target}) => setNowName(target.value)} />
          <br />
          Lat
          <input type="text" value={nowLat} onChange={({target}) => setNowLat(target.value)} />
          Long
          <input type="text" value={nowLong} onChange={({target}) => setNowLong(target.value)} />
        </div>
        <div>
          <br />
          Where are you from?
          <br />
          City, state, country
          <input type="text" value={fromName} onChange={({target}) => setFromName(target.value)} />
          <br />
          Lat
          <input type="text" value={fromLat} onChange={({target}) => setFromLat(target.value)} />
          Long
          <input type="text" value={fromLong} onChange={({target}) => setFromLong(target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default SubmissionFrom;