'use client';

import { Suspense } from 'react';
import Maps from '../Maps';

export default function MapsWrapper() {
  return (
    <Suspense fallback={<div>Carregando mapa...</div>}>
      <Maps />
    </Suspense>
  );
}
