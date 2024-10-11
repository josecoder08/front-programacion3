import React, { useContext } from 'react';
import DataTable from "react-data-table-component";
import { ClientContext } from '../../Context';

function Table({ data }) {
  const { clients, setClients } = useContext(ClientContext);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3001/api/client/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      // Filtra el cliente eliminado de la lista
      const updatedClients = clients.filter(client => client._id !== id);
      setClients(updatedClients);
      console.log(`Cliente con id ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error eliminando el cliente:', error);
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: row => row.user?.firtname,
      sortable: true,
    },
    {
      name: "Apellido",
      selector: row => row.user?.lastname,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.user?.email,
      sortable: true,
    },
    {
      name: "Celular",
      selector: row => row.user?.celular,
      sortable: true,
    },
    {
      name: "Documento",
      selector: row => row.user?.documento,
      sortable: true,
    },
    {
      name: "Localidad",
      selector: row => row.localidad,
      sortable: true,
    },
    {
      name: "Código Postal",
      selector: row => row.codigo_postal,
      sortable: true,
    },
    {
      name: "Tipo de Cliente",
      selector: row => row.tipo_cliente,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: row => (
        <div className="flex space-x-2">
          <a href={`/editar/${row._id}`} className="text-blue-600 hover:text-blue-800" title="Editar">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m0 0L9.292 18.244a2 2 0 01-.883.513l-3.38.845a1 1 0 01-1.213-1.212l.845-3.38a2 2 0 01.513-.884l9.474-9.474zm0 0L17.7 2.3A2 2 0 1121.7 6.3L18.767 9.232z" />
            </svg>
          </a>
          <button onClick={() => handleDelete(row._id)} className="text-red-600 hover:text-red-800" title="Eliminar">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive
        fixedHeader
      />
    </div>
  );
}

export default Table;
