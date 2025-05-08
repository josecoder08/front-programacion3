import React, { useContext } from 'react';
import Layout from "../../Components/Layout";
import Table from "../../Components/Table"; // Importa el componente de la tabla
import { ClientContext } from '../../Context'; // Asegúrate de importar el contexto

function Home() {
  const { clients } = useContext(ClientContext); // Obtiene el estado de clients desde el contexto

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mb-6">Información de Clientes</h1>

        {clients.length === 0 ? (
          <p className="text-center text-gray-600">No hay clientes para mostrar.</p> // Mensaje si no hay clientes
        ) : (
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <Table data={clients} /> {/* Pasa los datos de clients al componente Table */}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Home;

