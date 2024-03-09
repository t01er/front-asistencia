import React, { useState } from 'react';
import Header from '../Header';
import axios from 'axios';

export default function Faltas() {
  const [dni, setDniEstudiante] = useState('');
  const [fecha, setFecha] = useState('');
  const [motivo_salida, setMotivoFalta] = useState('');

  const handleDniChange = (e) => {
    setDniEstudiante(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleMotivoFaltaChange = (e) => {
    setMotivoFalta(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/falta', {
        dni,
        fecha,
        motivo_salida,
      });
      setDniEstudiante("")
      setFecha("")
      setMotivoFalta("")
      console.log('Registro de falta exitoso:', response.data);
    } catch (error) {
      console.error('Error al registrar falta:', error);
    }
  };

  return (
    <>
      <Header />
      <main className='max-w-7xl m-auto'>
        <div>
          <h1 className='text-center font-bold text-2xl my-10'>Registrar Motivo de Falta</h1>
        </div>
        <div className=' max-w-sm m-auto'>
          <form onSubmit={handleSubmit}>
            <div className=''>
              <div className='flex flex-col'>
                <label htmlFor="dni">DNI Estudiante</label>
                <input
                  required
                  className='p-1 w-full border border-zinc-800 rounded'
                  type="text"
                  id="dni"
                  value={dni}
                  onChange={handleDniChange}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="fecha">Fecha</label>
                <input
                  required
                  className='p-1 w-full border border-zinc-800 rounded'
                  type="date"
                  id="fecha"
                  value={fecha}
                  onChange={handleFechaChange}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="motivo_salida">Motivo Falta</label>
                <textarea
                  required
                  className='border border-zinc-800 rounded resize-none h-24'
                  id="motivo_salida"
                  cols="30"
                  rows="10"
                  value={motivo_salida}
                  onChange={handleMotivoFaltaChange}
                ></textarea>
              </div>
              <button className='py-2 px-4 bg-black hover:bg-black/85 ease-out duration-500 text-white rounded w-full my-5' type="submit">Enviar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
