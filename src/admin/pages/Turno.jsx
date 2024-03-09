import React, { useState, useEffect } from 'react';
import Header from '../Header';

export default function Turno() {
    const [turno, setTurno] = useState(null);
    const [tipoTurno, setTipoTurno] = useState('');
    const [horaLimite, setHoraLimite] = useState('');

    const fetchTurno = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/turno");
            const data = await response.json();
            // console.log(data);
            setTurno(data);
        } catch (error) {
            console.error('Error fetching turno:', error);
        }
    };

    useEffect(() => {
        fetchTurno();
    }, []);

    const handleTipoTurnoChange = (e) => {
        setTipoTurno(e.target.value);
    };

    const handleHoraLimiteChange = (e) => {
        setHoraLimite(e.target.value);
    };

    const handleCrearHorario = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/turno", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    turno: tipoTurno,
                    hora_limite: horaLimite,
                }),
            });
            setTipoTurno("")
            setHoraLimite("")
            const data = await response.json();
            console.log('Nuevo horario creado:', data);
            fetchTurno();
        } catch (error) {
            console.error('Error al crear horario:', error);
        }
    };

    return (
        <>
            <Header />
            <div className='max-w-6xl m-auto'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold mt-10'>Registrar Turno</h2>
                </div>
                <div className='flex justify-around mt-20'>
                    <div className='flex flex-row flex-wrap gap-5 w-full'>
                        {turno ? (
                            turno.map((item, index) => (
                                <div className='py-10 px-20 border border-zinc-400' key={index}>
                                    <p>{item.turno}</p>
                                    <p>{item.hora_limite}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className='w-full'>
                        <h3 className='text-2xl mb-20'>Crear un nuevo horario</h3>
                        <form onSubmit={handleCrearHorario}>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="tipoTurno">Tipo Turno</label>
                                    <input
                                        required
                                        id="tipoTurno"
                                        name="tipoTurno"
                                        className='p-2 border-2 border-zinc-400 rounded'
                                        type="text"
                                        value={tipoTurno}
                                        onChange={handleTipoTurnoChange}
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="horaLimite">Hora limite entrada</label>
                                    <input
                                        required
                                        id="horaLimite"
                                        name="horaLimite"
                                        className='p-2 border-2 border-zinc-400 rounded'
                                        type='time'
                                        value={horaLimite}
                                        onChange={handleHoraLimiteChange}
                                    />
                                </div>
                                <button type="submit" className='py-2 px-4 bg-zinc-900 text-white rounded-md'>Crear Horario</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
