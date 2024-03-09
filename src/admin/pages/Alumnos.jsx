import React, { useState } from 'react';
import Header from '../Header';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';

export default function Alumnos() {
  const [dni, setDni] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: 'dni',
      label: 'DNI',
    },
    {
      name: 'nombres',
      label: 'Nombres',
    },
    {
      name: 'apellido_p',
      label: 'Apellido Paterno',
    },
    {
      name: 'apellido_m',
      label: 'Apellido Materno',
    },
    {
      name: 'fecha',
      label: 'Fecha',
      options: {
        customBodyRender: (value) => new Date(value).toLocaleDateString(),
      },
    },
    {
      name: 'hora_entrada',
      label: 'Hora Entrada',
    },
    {
      name: 'hora_salida',
      label: 'Hora Salida',
    },
    {
      name: 'estado_asistencia',
      label: 'Estado Asistencia',
    },
  ];

  const options = {
    filter: true,
    filterType: 'textField',
    responsive: 'standard',
    selectableRows: 'none',
    rowsPerPageOptions: [10, 25, 50, 100],
    rowsPerPage: 10,
    pagination: true,
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/reporte/${dni}`);
      setReportData(response.data.result);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setDni(e.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <>
      <Header />
      <div className='max-w-7xl m-auto'>
        <h2 className='text-center text-2xl font-bold my-10'>Reporte de Alumno por DNI</h2>
        <div className='flex flex-col items-start'>
          <div className='flex gap-2' >
            <input required placeholder='Ingrese DNI' className=' w-fit p-1 border-2 border-zinc-600 rounded-md' type="text" value={dni} onChange={handleInputChange} />
            <button className='w-fit py-2 px-4 bg-black text-white rounded' onClick={handleSearch}>Buscar</button>
          </div>
        </div>
        <div>
          <MUIDataTable
            title="Reporte de Alumnos"
            data={reportData}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </>
  );
}
