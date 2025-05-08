import React, { createContext, useState, useEffect } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]); // Estado global para los clientes

  useEffect(() => {
    fetch('http://localhost:3001/api/clienteEstacionamiento')
      .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json();
      })
      .then(data => {
        console.log('Clientes estacionamiento:', data);
        setClients(data.data); // ← CORREGIDO
      })
      .catch(error => console.error('Error al obtener los clientes de estacionamiento:', error));
  }, []);
  return (
    <ClientContext.Provider value={{ clients, setClients }}>
{children}
    </ClientContext.Provider>
  );
};