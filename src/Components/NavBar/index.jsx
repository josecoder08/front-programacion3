import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from 'baseui/drawer';
import { Button } from 'baseui/button';
import { Menu } from 'baseui/icon';
import Auth0 from '../../Auth0';
import logo from '../../images/logo.png';


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/crear', label: 'Crear' },
    { to: '/editar', label: 'Editar' },
  ];

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-16 h-" />
        <h1 className="text-xl font-bold text-blue-600">Estaciona Fácil</h1>
      </div>

      {/* Menú desktop */}
      <nav className="hidden md:flex gap-4">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm text-gray-700 hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Auth0 solo visible en desktop */}
      <div className="hidden md:block">
        <Auth0 />
      </div>

      {/* Menú móvil */}
      <div className="md:hidden">
        <Button onClick={() => setIsOpen(true)} kind="tertiary" size="compact">
          <Menu size={24} />
        </Button>
      </div>

      {/* Drawer móvil */}
      <Drawer isOpen={isOpen} autoFocus onClose={() => setIsOpen(false)} anchor="left">
        <div className="flex flex-col gap-4 p-4">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          {/* Opción para volver al inicio */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-semibold text-blue-600"
          >
            Volver al Inicio
          </Link>
          <div className="mt-4">
            <Auth0 />
          </div>
        </div>
      </Drawer>
    </header>
  );
}

export default NavBar;
