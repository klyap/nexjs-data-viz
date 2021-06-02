import { useState, useEffect } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import fire from '../lib/firebase-config';
import Map from '../components/map';
import SubmissionFrom from '../components/submission-form';

export default function Home() {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Map />
      <SubmissionFrom />
    </Layout>
  )
}


