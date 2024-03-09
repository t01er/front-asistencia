import React, { useState, useEffect } from 'react';
import Header from '../Header';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';

export default function General() {
    const [general, setGeneral] = useState(null);

    const getColorStyle = (estadoAsistencia) => {
        switch (estadoAsistencia) {
            case 1:
                return { backgroundColor: '#84cc16', color: 'white', padding: "10px 20px", borderRadius: "5px", textAlign: "center" };
            case 2:
                return { backgroundColor: '#f59e0b', color: 'white', padding: "10px 20px", borderRadius: "5px", textAlign: "center" };
            case 3:
                return { backgroundColor: '#2563eb', color: 'white', padding: "10px 20px", borderRadius: "5px", textAlign: "center" };
            case 0:
                return { backgroundColor: '#991b1b', color: 'white', padding: "10px 20px", borderRadius: "5px", textAlign: "center" };
            default:
                return {};
        }
    };

    useEffect(() => {
        const fetchGeneral = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/estudiante");
                const data = response.data;
                console.log(data.result);
                setGeneral(data.result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGeneral();
    }, []);

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
            options: {
                customBodyRender: (value) => (
                    <div style={getColorStyle(value)}>
                        {value === 1 && 'Asistió'}
                        {value === 2 && 'Tarde'}
                        {value === 3 && 'Permiso'}
                        {value === 0 && 'falto'}
                    </div>
                ),
            },
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
        print: true,
        download: true,
    };


    return (
        <>
            <div>
                <Header />
                {general && (
                    <div className='max-w-7xl m-auto'>
                        <MUIDataTable
                            title="Datos Generales"
                            data={general}
                            columns={columns}
                            options={options}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
