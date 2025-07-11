'use client';

import React, { useEffect, useState } from 'react';
import Home from './components/Home';

export default function DashboardLayoutFullScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <Home />
  );
}
