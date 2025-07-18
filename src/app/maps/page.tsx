'use client';

import dynamic from 'next/dynamic';

const MapsWrapper = dynamic(() => import('../components/MapsWrapper'), { ssr: false });

export default function MapsPage() {
  return <MapsWrapper />;
}