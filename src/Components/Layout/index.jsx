import React from 'react';
import NavBar from '../NavBar';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <NavBar />
      <main className="flex-grow p-4 w-full max-w-screen-lg mx-auto">
        {children}
      </main>
      <footer className="bg-white border-t mt-auto p-4 text-center text-sm text-gray-500">
        © 2025 Estaciona Fácil. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Layout;
