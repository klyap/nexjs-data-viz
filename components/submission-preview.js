import React from 'react';
import styles from './submission-preview.module.css'
import Image from 'next/image'

const SubmissionPreview = (props) => {
  const {
    fromName,
    nowName,
    story,
    showHelpText
  } = props;
  return (
    <div className={styles.submissionPreviewContainer}>
      {
        showHelpText && <div><h3>Click on a journey to learn more</h3></div>
      }

      { !showHelpText && <>
        <div className={styles.avatar}><Image src={'/images/avatar.png'} height='80px'width='80px'/></div>
        <div className={styles.bioTextSection}>
          <div className={styles.bioText}>I am at {nowName ? nowName : '...'}</div>
          <div className={styles.bioText}>I am from {fromName ? fromName : '...'}</div>
        </div>
        <br/>
        <div className={styles.darkPurpleSection}>
          <h4 className={styles.storyTitle}>My Story</h4>
          <div className={styles.storySection}>{story}</div>
        </div>
        </>
      }

    </div>
  )
}

export default SubmissionPreview;