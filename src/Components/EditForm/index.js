import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClientContext } from '../../Context';

import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Grid, Cell } from 'baseui/layout-grid';
import { Card } from 'baseui/card';

const EditForm = () => {
  const { clients, setClients } = useContext(ClientContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const cliente = clients.find(cliente => cliente._id === id);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    mail: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    provincia: '',
  });

  const [mostrarVerificacion, setMostrarVerificacion] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre || '',
        apellido: cliente.apellido || '',
        dni: cliente.dni || '',
        mail: cliente.mail || '',
        telefono: cliente.telefono || '',
        direccion: cliente.direccion || '',
        ciudad: cliente.ciudad || '',
        provincia: cliente.provincia || '',
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/clienteEstacionamiento/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al actualizar los datos del cliente');

      const data = await res.json();
      const updatedClients = clients.map(c => (c._id === id ? data.cliente : c));
      setClients(updatedClients);

      setMensaje(data.mensaje || 'Revisá tu correo para el código de verificación');
      setMostrarVerificacion(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al actualizar el cliente.');
    }
  };

  const handleVerificarCodigo = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/clienteEstacionamiento/${id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        navigate('/');
      } else {
        alert(result.error || 'Código incorrecto');
      }
    } catch (err) {
      console.error(err);
      alert('Error al verificar el código');
    }
  };

  if (!cliente) {
    return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Cliente no encontrado</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <Card
        overrides={{
          Root: {
            style: {
              width: '100%',
              maxWidth: '800px',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          },
        }}
      >
        <h2 style={{ fontSize: '26px', fontWeight: '600', marginBottom: '1.5rem' }}>
          {mostrarVerificacion ? 'Verificación' : 'Editar Cliente'}
        </h2>

        {!mostrarVerificacion ? (
          <form onSubmit={handleSubmit}>
            <Grid>
              {[
                { label: 'Nombre', name: 'nombre' },
                { label: 'Apellido', name: 'apellido' },
                { label: 'DNI', name: 'dni' },
                { label: 'Correo electrónico', name: 'mail', type: 'email' },
                { label: 'Teléfono', name: 'telefono' },
                { label: 'Dirección', name: 'direccion' },
                { label: 'Ciudad', name: 'ciudad' },
                { label: 'Provincia', name: 'provincia' },
              ].map(({ label, name, type = 'text' }) => (
                <Cell key={name} span={[4, 4, 6]}>
                  <FormControl label={label}>
                    <Input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                </Cell>
              ))}
            </Grid>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <Button type="submit" overrides={{ BaseButton: { style: { flex: 1 } } }}>
                Guardar Cambios
              </Button>
              <Button
                type="button"
                kind="secondary"
                onClick={() => navigate('/')}
                overrides={{ BaseButton: { style: { flex: 1 } } }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <p style={{ marginBottom: '1rem' }}>{mensaje}</p>
            <FormControl label="Código de verificación (6 dígitos)">
              <Input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                maxLength={6}
                pattern="\d{6}"
                placeholder="123456"
                required
              />
            </FormControl>
            <Button onClick={handleVerificarCodigo}>Verificar</Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EditForm;