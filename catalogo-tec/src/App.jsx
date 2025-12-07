import React, { useState } from 'react';

// 1. Datos Simulando la Base de Datos
const datosEquiposIniciales = [];
const datosUsuariosIniciales = [];
const datosRelacionesIniciales = [];

function App() {
  // Ahora los datos son estados para poder modificarlos (agregar nuevos usuarios, nueuos equipos, etc.)
  const [equipos, setEquipos] = useState(datosEquiposIniciales);
  const [usuarios, setUsuarios] = useState(datosUsuariosIniciales);
  const [relaciones, setRelaciones] = useState(datosRelacionesIniciales);

  // Estados para el formulario de nuevo usuario
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPuesto, setNuevoPuesto] = useState('');

  // Estados para el formulario de nuevo equipo
  const [nuevoTipo, setNuevoTipo] = useState('');
  const [nuevaMarca, setNuevaMarca] = useState('');
  const [nuevoSerial, setNuevoSerial] = useState('');

  // Estados para el formulario de nueva relación
  // Ahora guardan el ID del equipo y del usuario seleccionado
  const [nuevoUsuarioId, setNuevoUsuarioId] = useState('');
  const [nuevoEquipoId, setNuevoEquipoId] = useState('');
  
  // Estado para la fecha de asignación (usaremos la fecha actual)
  const [fechaAsignacion, setFechaAsignacion] = useState(new Date().toISOString().substring(0, 10)); // Formato YYYY-MM-DD

  // Controla qué tabla estamos viendo
  const [vistaActual, setVistaActual] = useState('equipos');

  // Lógica para agregar un nuevo usuario
  const handleAgregarUsuario = () => {
    if (!nuevoNombre.trim() || !nuevoPuesto) {
      alert("Por favor, introduce un nombre y selecciona un puesto.");
      return;
    }

    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
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

  // Lógica para agregar un nuevo equipo
  const handleAgregarEquipo = () => {
    if (!nuevoTipo.trim() || !nuevaMarca.trim() || !nuevoSerial.trim()) {
      alert("Por favor, completa todos los campos del equipo.");
      return;
    }
    
    // Evitar seriales duplicados
    if (equipos.some(e => e.serial === nuevoSerial.trim())) {
        alert("¡Error! El serial ya existe.");
        return;
    }

    const nuevoId = equipos.length > 0 ? Math.max(...equipos.map(e => e.id)) + 1 : 1;
    const nuevoEquipo = {
      id: nuevoId,
      tipo: nuevoTipo,
      marca: nuevaMarca,
      serial: nuevoSerial.trim()
    };

    setEquipos([...equipos, nuevoEquipo]);

    // Limpiar el formulario
    setNuevoTipo('');
    setNuevaMarca('');
    setNuevoSerial('');
  }
  
  // Lógica para agregar una nueva relación
  const handleAgregarRelacion = () => {
    if (!nuevoEquipoId || !nuevoUsuarioId) {
      alert("Por favor, selecciona un equipo y un usuario.");
      return;
    }

    // 1. Encontrar los datos completos para la nueva relación
    const equipoAsignado = equipos.find(e => e.id === parseInt(nuevoEquipoId));
    const usuarioAsignado = usuarios.find(u => u.id === parseInt(nuevoUsuarioId));
    
    if (!equipoAsignado || !usuarioAsignado) {
        alert("Error al encontrar datos de equipo/usuario. Intenta de nuevo.");
        return;
    }

    // 2. Crear el objeto de nueva relación
    const nuevoId = relaciones.length > 0 ? Math.max(...relaciones.map(r => r.id)) + 1 : 1;
    const nuevaRelacion = {
      id: nuevoId,
      // Guardamos la información clave que se usará para mostrar en la tabla
      equipoSerial: equipoAsignado.serial, // Usamos el serial para la tabla
      usuarioNombre: usuarioAsignado.nombre, // Usamos el nombre para la tabla
      equipoId: parseInt(nuevoEquipoId), // Guardamos los IDs para posibles futuras desasignaciones
      usuarioId: parseInt(nuevoUsuarioId),
      fecha: fechaAsignacion,
    };
    
    // 3. Actualizar el estado y limpiar
    setRelaciones([...relaciones, nuevaRelacion]);
    setNuevoEquipoId('');
    setNuevoUsuarioId('');
    setFechaAsignacion(new Date().toISOString().substring(0, 10)); // Resetear a la fecha actual
  };


  // 3. Para renderizar la tabla según la vista actual 
  const renderTabla = () => {
    switch (vistaActual) {
      case 'equipos':
        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <h3>➕ Agregar Nuevo Equipo</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Tipo de equipo"
                  value={nuevoTipo}
                  onChange={(e) => setNuevoTipo(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  placeholder="Marca"
                  value={nuevaMarca}
                  onChange={(e) => setNuevaMarca(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  placeholder="Serial"
                  value={nuevoSerial}
                  onChange={(e) => setNuevoSerial(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                />
                <button
                  onClick={handleAgregarEquipo}
                  style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Agregar
                </button>
              </div>
            </div>
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
          </>
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
          <>
            {/* Formulario de Asignación */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
              <h3>🔗 Asignar Equipo a Usuario</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                {/* SELECT DE EQUIPOS */}
                <select
                  value={nuevoEquipoId}
                  onChange={(e) => setNuevoEquipoId(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Selecciona un Equipo (Serial) --</option>
                  {/* Mapea los equipos guardados en el estado */}
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {`${equipo.tipo} (${equipo.serial})`}
                    </option>
                  ))}
                </select>
                
                {/* SELECT DE USUARIOS */}
                <select
                  value={nuevoUsuarioId}
                  onChange={(e) => setNuevoUsuarioId(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ccc' }}
                >
                  <option value="">-- Selecciona un Usuario --</option>
                  {/* Mapea los usuarios guardados en el estado */}
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {`${usuario.nombre} (${usuario.puesto})`}
                    </option>
                  ))}
                </select>
                
                {/* Campo de fecha (opcional, pero útil) */}
                <input 
                    type="date"
                    value={fechaAsignacion}
                    onChange={(e) => setFechaAsignacion(e.target.value)}
                    style={{ padding: '8px', border: '1px solid #ccc' }}
                />

                <button
                  onClick={handleAgregarRelacion}
                  style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Asignar
                </button>
              </div>
            </div>
            
            {/* Tabla de Relaciones */}
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
                    {/* Usamos el serial y nombre guardados en la relación para mejor lectura */}
                    <td>{item.equipoSerial}</td> 
                    <td>{item.usuarioNombre}</td>
                    <td>{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            💻 Ver Equipos ({equipos.length})
          </button>
          <button onClick={() => setVistaActual('usuarios')}>
            👥 Ver Usuarios ({usuarios.length})
          </button>
          <button onClick={() => setVistaActual('relaciones')}>
            🔗 Ver Asignaciones ({relaciones.length})
          </button>
        </div>

        {/* TABLA DINÁMICA */}
        <div>
          {renderTabla()}
        </div>

        {/* Indicador visual de qué estamos viendo */}
        <p style={{ marginTop: '10px', color: '#666' }}>
          Vista actual: <strong>{vistaActual.toUpperCase()}</strong>
        </p>
      </div>
    </>
  )
}

export default App