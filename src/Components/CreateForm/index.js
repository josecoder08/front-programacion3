import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../../Context';

const CreateForm = () => {
  const { clients, setClients } = useContext(ClientContext);
  const navigate = useNavigate();

  // Form state
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, create the user
      const userResponse = await fetch('https://programacion3.vercel.app/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firtname: formData.firtname,
          lastname: formData.lastname,
          email: formData.email,
          celular: formData.celular,
          documento: formData.documento,
        }),
      });

      if (!userResponse.ok) {
        throw new Error('Error al crear el usuario');
      }

      const newUser = await userResponse.json();

      // Then, create the client using the new user's ID
      const clientResponse = await fetch('https://programacion3.vercel.app/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          localidad: formData.localidad,
          codigo_postal: formData.codigo_postal,
          tipo_cliente: formData.tipo_cliente,
          user: newUser._id,
        }),
      });

      if (!clientResponse.ok) {
        throw new Error('Error al crear el cliente');
      }

      const newClient = await clientResponse.json();

      // Combine user and client data
      const combinedData = {
        ...newClient,
        user: newUser,
      };

      // Update context with the combined data
      setClients([...clients, combinedData]);

      console.log('Datos enviados:', formData);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-300 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Crear Nuevo Cliente</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="firtname"
            value={formData.firtname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Apellido</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Celular</label>
          <input
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Documento</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Localidad</label>
          <input
            type="text"
            name="localidad"
            value={formData.localidad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Código Postal</label>
          <input
            type="text"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tipo de Cliente</label>
          <input
            type="text"
            name="tipo_cliente"
            value={formData.tipo_cliente}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button type="submit" className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Crear Cliente
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full p-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
