import MainLayout from '../components/MainLayout/MainLayout';
import Home from '../features/Home/Home';
import Cotizacion from '../features/Cotizacion/Cotizacion';
import Resumen from '../features/Resumen/Resumen';

const routes = [
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/cotizacion',
    element: (
      <Cotizacion />
    ),
  },
  {
    path: '/resumen',
    element: (
      <Resumen />
    ),
  },
];

export default routes;
