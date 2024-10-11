import React, { useContext } from 'react';
import Layout from "../../Components/Layout";
import Table from "../../Components/Table"; // Importa el componente de la tabla
import { ClientContext } from '../../Context'; // Asegúrate de importar el contexto

function Home() {
  const { clients } = useContext(ClientContext); // Obtiene el estado de clients desde el contexto

  return (
    <Layout>
      <h1>Información de Clientes</h1>
      {clients.length === 0 ? (
        <p>No hay clientes para mostrar.</p> // Mensaje si no hay clientes
      ) : (
        <Table data={clients} /> // Pasa los datos de clients al componente Table
      )}
    </Layout>
  );
}

export default Home;
