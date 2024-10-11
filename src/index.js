import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth0 from './Auth0';
import App from './Pages/App';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

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
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RootComponent />
    </Auth0Provider>
  </React.StrictMode>
);



