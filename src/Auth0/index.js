import { useAuth0 } from "@auth0/auth0-react";
import Style from "./App.module.css";

function Auth0() {
  const { user, logout, loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>; // Loader opcional
  }

  return (
    <div className="flex items-center gap-3">
      {/* Si está autenticado, mostrar avatar y email */}
      {isAuthenticated && (
        <>
          <img src={user.picture} alt="usuario" className="w-8 h-8 rounded-full" />
          <p className="text-sm text-gray-800">{user.email}</p>
        </>
      )}

      {/* Botón Login/Logout */}
      {!isAuthenticated ? (
        <button
          className={`${Style.BotonLogin} px-3 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700`}
          onClick={() =>
            loginWithRedirect({
              redirect_uri: 'https://front-programacion3.vercel.app/callback',
            })
          }
        >
          Login
        </button>
      ) : (
        <button
          className={`${Style.BotonLogin} px-3 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600`}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Auth0;
