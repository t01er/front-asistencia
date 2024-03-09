import React, { useState } from 'react';
import Header from '../Header';
import axios from 'axios';

export default function Permisos() {
  const [dni, setDni] = useState('');
  const [motivo_salida, setMotivoSalida] = useState('');

  const handleDniChange = (e) => {
    setDni(e.target.value);
  };

  const handleMotivoSalidaChange = (e) => {
    setMotivoSalida(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://localhost:3000/api/permiso', {
        dni,
        motivo_salida,
        estado_asistencia: 3,
      });

      console.log('Actualización de permiso exitosa:', response.data);
      setDni("");
      setMotivoSalida("");
    } catch (error) {
      console.error('Error al actualizar permiso:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h2 className='text-center font-bold text-2xl py-10'>Actualizar Permisos</h2>
      </div>

      <div className='flex items-center justify-center'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor="dni">DNI</label>
            <input
              className='p-1  border rounded border-zinc-800'
              type="text"
              id="dni"
              value={dni}
              onChange={handleDniChange}
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="motivoSalida">Motivo Salida</label>
            <textarea className='rounded border-zinc-800 border resize-none h-20' name="motivo_salida" id="motivo_salida" value={motivo_salida} onChange={handleMotivoSalidaChange} cols="30" rows="10"></textarea>
          </div>
          <button className='py-2 px-4 bg-black text-white my-2 w-full rounded' type="submit">Actualizar</button>
        </form>
      </div>
    </>
  );
}
