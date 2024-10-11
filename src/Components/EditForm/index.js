import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClientContext } from '../../Context';

const EditForm = () => {
  const { clients, setClients } = useContext(ClientContext); // Obtiene 'clients' y 'setClients' desde el contexto
  const { id } = useParams(); // Obtén el ID del cliente de los parámetros de la URL
  const navigate = useNavigate();

  const cliente = clients.find(cliente => cliente._id === id);

  const [formData, setFormData] = useState({
    firtname: '',
    lastname: '',
    email: '',
    celular: '',
    documento: '',
    localidad: '',
    codigo_postal: '',
    tipo_cliente: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        firtname: cliente.user?.firtname || '',
        lastname: cliente.user?.lastname || '',
        email: cliente.user?.email || '',
        celular: cliente.user?.celular || '',
        documento: cliente.user?.documento || '',
        localidad: cliente.localidad || '',
        codigo_postal: cliente.codigo_postal || '',
        tipo_cliente: cliente.tipo_cliente || '',
      });
    }
  }, [cliente]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = cliente.user._id;

    try {
      const clientResponse = await fetch(`http://localhost:3001/api/client/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          localidad: formData.localidad,
          codigo_postal: formData.codigo_postal,
          tipo_cliente: formData.tipo_cliente,
        })
      });

      if (!clientResponse.ok) {
        throw new Error('Error al actualizar los datos del cliente');
      }

      const userResponse = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firtname: formData.firtname,
          lastname: formData.lastname,
          email: formData.email,
          celular: formData.celular,
          documento: formData.documento,
        })
      });

      if (!userResponse.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }

      const updatedClient = await clientResponse.json();
      const updatedUser = await userResponse.json();

      const updatedData = clients.map(cliente =>
        cliente._id === id ? { ...updatedClient, user: updatedUser } : cliente
      );
      setClients(updatedData);

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!cliente) {
    return <div>Cliente no encontrado</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-300 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Editar Cliente</h2>
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="firtname"
            value={formData.firtname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Apellido</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Celular</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Documento</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Localidad</label>
          <input
            type="text"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Código Postal</label>
          <input
            type="text"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 px-2 mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tipo de Cliente</label>
          <input
            type="text"
            name="tipo_cliente"
            value={formData.tipo_cliente}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex space-x-4 mt-6">
        <button type="submit" className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full p-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default EditForm;
