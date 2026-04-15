import { useEffect } from 'react';
import { initCotizador } from '@/scripts/cotizador';

export default function CotizadorIsland() {
  useEffect(() => {
    initCotizador();
    const handlePageLoad = () => initCotizador();
    document.addEventListener('astro:page-load', handlePageLoad);

    return () => {
      document.removeEventListener('astro:page-load', handlePageLoad);
    };
  }, []);

  return null;
}
