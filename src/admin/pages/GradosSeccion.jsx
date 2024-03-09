import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';

export default function GradosSeccion() {
    const [grados, setGrados] = useState([]);
    const [secciones, setSecciones] = useState([]);
    const [selectedGrado, setSelectedGrado] = useState('');
    const [selectedSeccion, setSelectedSeccion] = useState('');
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGrados = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/grado/");
                const data = await response.json();
                setGrados(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchSeccion = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/seccion/");
                const data = await response.json();
                setSecciones(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Llamada a ambas funciones al montar el componente
        fetchGrados();
        fetchSeccion();
    }, []);

    const handleGradoChange = (e) => {
        setSelectedGrado(e.target.value);
    };

    const handleSeccionChange = (e) => {
        setSelectedSeccion(e.target.value);
    };


    


    const handleSearch = async () => {
        try {
            if (!selectedGrado || !selectedSeccion) {
                console.error('Seleccione un grado y una sección');
                return;
            }
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/reportes/${selectedGrado}/${selectedSeccion}`);
            setReportData(response.data.result);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } finally {
            setLoading(false);
        }
    };


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
            options: {
                customBodyRender: (value) => value || '-',
            },
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

    return (
        <>
            <Header />
            <main className='max-w-7xl m-auto'>
                <div>
                    <h2 className='text-center font-bold text-2xl my-10'>Reportes de Estudiante por Grado y Seccion</h2>
                </div>
                {/* Grado */}
                <div className='flex justify-start gap-2 items-start flex-row'>

                    <select className='py-2 px-4 border border-zinc-600 rounded w-fit' name="grado" value={selectedGrado} onChange={handleGradoChange}>
                        <option value="">Seleccione un grado</option>
                        {grados.map((grado) => (
                            <option key={grado.id_grado} value={grado.id_grado}>
                                {grado.nombre_grado}
                            </option>
                        ))}
                    </select>

                    {/* Sección */}
                    <select className='py-2 px-4 border border-zinc-600 rounded w-fit' name="seccion" value={selectedSeccion} onChange={handleSeccionChange}>
                        <option value="">Seleccione una sección</option>
                        {secciones.map((seccion) => (
                            <option key={seccion.id_seccion} value={seccion.id_seccion}>
                                {seccion.nombre_seccion}
                            </option>
                        ))}
                    </select>

                    <button className='bg-black py-2 px-4 text-white rounded' onClick={handleSearch}>Buscar</button>
                </div>

                {/* Resultado en tabla */}
                {loading && <p>Cargando...</p>}


                <MUIDataTable
                    title="Reporte de Alumnos por Grado"
                    data={reportData}
                    columns={columns}
                    options={options}
                />
            </main>

        </>
    );
}
