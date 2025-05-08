import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth0 from './Auth0';
import App from './Pages/App';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

// 👉 Agregamos estas líneas:
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { BaseProvider, LightTheme } from 'baseui';

// 👉 Creamos la instancia del engine de estilos:
const engine = new Styletron();

// Tu componente raíz sigue igual
const RootComponent = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated ? <Auth0 /> : <App />}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <RootComponent />
        </Auth0Provider>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);
