import React, { useState } from 'react';

// 1. Datos Simulando la Base de Datos
const datosEquipos = [
  { id: 1, tipo: 'Laptop', marca: 'Dell', serial: 'DELL-001' },
  { id: 2, tipo: 'Monitor', marca: 'Samsung', serial: 'SAM-992' },
  { id: 3, tipo: 'Teclado', marca: 'Logitech', serial: 'LOG-334' },
];

const datosUsuarios = [
  { id: 1, nombre: 'Ana García', puesto: 'Desarrolladora' },
  { id: 2, nombre: 'Carlos López', puesto: 'Diseñador' },
  { id: 3, nombre: 'Maria Diaz', puesto: 'Gerente' },
];

const datosRelaciones = [
  { id: 1, equipo: 'DELL-001', usuario: 'Ana García', fecha: '2023-10-01' },
  { id: 2, equipo: 'SAM-992', usuario: 'Carlos López', fecha: '2023-11-15' }, 
];

function App() {
  // 2. Controla qué tabla estamos viendo ('equipos', 'usuarios', o 'relaciones')
  const [vistaActual, setVistaActual] = useState('equipos');

  // 3. Para renderizar la tabla según la vista actual
  const renderTabla = () => {
    switch (vistaActual) {
      case 'equipos':
        return (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Serial</th>
              </tr>
            </thead>
            <tbody>
              {datosEquipos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td>{item.serial}</td>
                </tr>
              ))}
            </tbody>
          </>
        );
      case 'usuarios':
        return (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Puesto</th>
              </tr>
            </thead>
            <tbody>
              {datosUsuarios.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.puesto}</td>
                </tr>
              ))}
            </tbody>
          </>
        );
      case 'relaciones':
        return (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Serial Equipo</th>
                <th>Asignado a</th>
                <th>Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {datosRelaciones.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.equipo}</td>
                  <td>{item.usuario}</td>
                  <td>{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </>
        );
      default:
        return null;
    }
  };

  // 4. La estructura visual
  return (
    <>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Gestión de Inventario IT</h1>

        {/* BOTONES CENTRADOS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
          <button onClick={() => setVistaActual('equipos')}>
            💻 Ver Equipos
          </button>
          <button onClick={() => setVistaActual('usuarios')}>
            👥 Ver Usuarios
          </button>
          <button onClick={() => setVistaActual('relaciones')}>
            🔗 Ver Asignaciones
          </button>
        </div>

        {/* TABLA DINÁMICA */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table border="1" cellPadding="10" style={{ width: '80%', borderCollapse: 'collapse' }}>
            {renderTabla()}
          </table>
        </div>

        {/* Indicador visual de qué estamos viendo */}
        <p style={{ marginTop: '10px', color: '#666' }}>
          Viendo tabla: <strong>{vistaActual.toUpperCase()}</strong>
        </p>
      </div>
    </>
  )
}

export default App
