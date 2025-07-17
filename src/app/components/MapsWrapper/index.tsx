'use client';

import Maps from '@/app/maps/page';
import { Suspense } from 'react';

export default function MapsWrapper() {
  return (
    <Suspense fallback={<div>Carregando mapa...</div>}>
      <Maps />
    </Suspense>
  );
}
