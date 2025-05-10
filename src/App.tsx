import React from 'react';
import { useRoutes } from 'react-router';
import routes from './routes/AppRoutes';

const App: React.FC = () => {
  const routing = useRoutes(routes);
  return routing;
};

export default App;
