// src/components/ScrollToTop.js

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    // 🔑 Hook de React Router para detectar cambios de ruta
    const { pathname } = useLocation();

    useEffect(() => {
        // 🔑 Cuando la ruta cambia, fuerza el scroll a la parte superior (0, 0)
        window.scrollTo(0, 0);
        
        // El array de dependencias asegura que se ejecuta en cada cambio de 'pathname'
    }, [pathname]);

    return null; // Este componente no renderiza nada visible
};

export default ScrollToTop;