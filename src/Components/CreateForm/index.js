import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Grid, Cell } from 'baseui/layout-grid';
import { Card } from 'baseui/card';

const CreateForm = () => {
  const navigate = useNavigate();
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

  const [clienteId, setClienteId] = useState(null);
  const [codigo, setCodigo] = useState('');
  const [mostrarVerificacion, setMostrarVerificacion] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/clienteEstacionamiento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Error al registrar cliente');

      const data = await res.json();
      setClienteId(data.cliente._id);
      setMostrarVerificacion(true);
      setMensaje(data.mensaje);
    } catch (err) {
      console.error('Error:', err);
      alert('Ocurrió un error al enviar el formulario.');
    }
  };

  const handleVerificarCodigo = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/clienteEstacionamiento/${clienteId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        navigate('/');
      } else {
        alert(result.error || 'Código inválido');
      }
    } catch (error) {
      console.error(error);
      alert('Error al verificar el código');
    }
  };

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
        <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '1rem' }}>
          Registro de Cliente
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
                Registrar
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
            <p style={{ marginBottom: '1rem' }}>{mensaje || 'Revisá tu correo para el código de verificación.'}</p>
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

export default CreateForm;