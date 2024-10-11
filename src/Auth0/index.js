import { useAuth0 } from "@auth0/auth0-react";
import Style from "./App.module.css";
function Auth0() {

  const { user, logout, loginWithRedirect, isAuthenticated, isLoading }= useAuth0();

  if (isLoading) {
    return <div>Cargando...</div>; // O cualquier componente de carga que prefieras
}
  return (
    <>
     <div className={Style.Container} >
      {
        (isAuthenticated && (
          <div className="flex items-center space-x-4">
            <p className="mb-10">{user.email}</p>
          <img src={user.picture} alt="usuario" className="w-10 h-10 rounded-full" />
        </div>) )
      }
      </div> 
      <div>
        {
          !isAuthenticated ? (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-2xl font-bold mb-4 text-center">Bienvenidos al Registro de Clientes !!! inicie sesión para Comenzar...</h1>
  <button className={`${Style.BotonLogin} p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700`} onClick={() => loginWithRedirect()}>
    Login
  </button>
</div>

          
        )
           : (<button className={`${Style.BotonLogin} p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700`}  onClick={()=>logout()}>Logout</button>)
        }
    </div> 
    </>
  );
}

export default Auth0;
