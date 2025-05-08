import { useRoutes, BrowserRouter } from 'react-router-dom';
import { ClientProvider } from '../../Context';
import Home from '../Home';
import Crear from '../Crear';
import Editar from '../Editar';
import './App.css';



const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/Crear', element: <Crear /> },
    { path: '/Editar/:id', element: <Editar /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <ClientProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </ClientProvider>
  );
};

export default App;

