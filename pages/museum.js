import { useState, useEffect } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Image from 'next/image'

export default function Home() {

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
        <Image src="/images/mock-museum-page.png" width="1290px" height="1800px"/>

    </div>
  )
}


