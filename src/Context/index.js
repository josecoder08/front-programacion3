import React, { createContext, useState, useEffect } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]); // Estado global para los clientes

  useEffect(() => {
        fetch('https://programacion3.vercel.app/api/client')
          .then(response => response.json())
          .then(data => {
            console.log(data); // Check what data is returned
            setClients(data.data); // Set the users from the API response's data array
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

  return (
    <ClientContext.Provider value={{ clients, setClients }}>
      {children}
    </ClientContext.Provider>
  );
};
