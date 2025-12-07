import React, { useState } from 'react';

// 1. Datos Simulando la Base de Datos
const datosEquiposIniciales = [];
const datosUsuariosIniciales = [];
const datosRelacionesIniciales = [];

function App() {
  // Ahora los datos son estados para poder modificarlos (agregar nuevos usuarios, nueuvos equipos, etc.)
  const [equipos, setEquipos] = useState(datosEquiposIniciales);
  const [usuarios, setUsuarios] = useState(datosUsuariosIniciales);
  const [relaciones, setRelaciones] = useState(datosRelacionesIniciales);

  // Estados para el formulario de nuevo usuario
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPuesto, setNuevoPuesto] = useState('');
  
  // Controla qué tabla estamos viendo
  const [vistaActual, setVistaActual] = useState('equipos');

  // Lógica para agregar un nuevo usuario
  const handleAgregarUsuario = () => {
    if (!nuevoNombre.trim() || !nuevoPuesto) {
      alert("Por favor, introduce un nombre y selecciona un puesto.");
      return;
    }
    
    const nuevoId = Math.max(...usuarios.map(u => u.id), 0) + 1; // Generar nuevo ID
    const nuevoUsuario = { 
      id: nuevoId, 
      nombre: nuevoNombre, 
      puesto: nuevoPuesto 
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    
    // Limpiar el formulario
    setNuevoNombre('');
    setNuevoPuesto('');
  };

  // 3. Para renderizar la tabla según la vista actual 
  const renderTabla = () => {
    switch (vistaActual) {
      case 'equipos':
        return (
          <table border="1" cellPadding="10" style={{ width: '80%', borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Serial</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.tipo}</td>
                  <td>{item.marca}</td>
                  <td>{item.serial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'usuarios':
        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <h3>➕ Agregar Nuevo Usuario</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nombre del usuario"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                />
                <select
                  value={nuevoPuesto}
                  onChange={(e) => setNuevoPuesto(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Selecciona un Puesto --</option>
                  {['Desarrollador', 'Diseñador', 'Gerente', 'Analista'].map((puesto) => (
                    <option key={puesto} value={puesto}>
                      {puesto}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={handleAgregarUsuario}
                  style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Contenedor de la tabla centrado */}
            <table border="1" cellPadding="10" style={{ width: '80%', borderCollapse: 'collapse', margin: '0 auto' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Puesto</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>{item.puesto}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </>
        );
      case 'relaciones':
        return (
          <table border="1" cellPadding="10" style={{ width: '80%', borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Serial Equipo</th>
                <th>Asignado a</th>
                <th>Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {relaciones.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.equipo}</td>
                  <td>{item.usuario}</td>
                  <td>{item.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div>
          {renderTabla()}
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