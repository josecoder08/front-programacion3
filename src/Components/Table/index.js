import React, { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { ClientContext } from '../../Context';

function Table() {
  const { clients } = useContext(ClientContext);

  const columns = [
    {
      name: "Nombre",
      selector: row => row.nombre || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Apellido",
      selector: row => row.apellido || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "DNI",
      selector: row => row.dni || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.mail || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: row => row.telefono || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Dirección",
      selector: row => row.direccion || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Ciudad",
      selector: row => row.ciudad || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Provincia",
      selector: row => row.provincia || "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Fecha de Creación",
      selector: row =>
        row.fechaCreacion ? new Date(row.fechaCreacion).toLocaleDateString() : "—",  // Usar selector
      sortable: true,
    },
    {
      name: "Acciones",
      cell: row => (
        <a
          href={`/editar/${row._id}`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
          title="Editar"
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m0 0L9.292 18.244a2 2 0 01-.883.513l-3.38.845a1 1 0 01-1.213-1.212l.845-3.38a2 2 0 01.513-.884l9.474-9.474zm0 0L17.7 2.3A2 2 0 1121.7 6.3L18.767 9.232z" />
          </svg>
        </a>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Clientes registrados</h2>
      <DataTable
        columns={columns}
        data={Array.isArray(clients) ? clients : []}
        pagination
        responsive
        fixedHeader
        noDataComponent="No hay clientes disponibles"
        highlightOnHover
        striped
      />
    </div>
  );
}

export default Table;
