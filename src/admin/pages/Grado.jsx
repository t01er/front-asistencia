import React, { useState, useEffect } from 'react';
import Header from '../Header';

export default function Grado() {
    const [turno, setTurno] = useState(null);
    const [grado, setGrado] = useState('');


    const fetchGrado = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/grado/");
            const data = await response.json();
            console.log(data);
            setTurno(data);
        } catch (error) {
            console.error('Error fetching turno:', error);
        }
    };

    useEffect(() => {
        fetchGrado();
    }, []);

    const handleTipoTurnoChange = (e) => {
        setGrado(e.target.value);
    };


    const handleCrearHorario = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/grado", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_grado: grado,
                }),
            });
            setGrado("")
            const data = await response.json();
            console.log('Nuevo grado creado:', data);
            fetchGrado();
        } catch (error) {
            console.error('Error al crear grado:', error);
        }
    };

    return (
        <>
            <Header />
            <div className='max-w-6xl m-auto'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold mt-10'>Registrar Grado</h2>
                </div>
                <div className='flex justify-around mt-20 '>
                    <div className='flex flex-row flex-wrap gap-5 w-full'>
                        {turno ? (
                            turno.map((item, index) => (
                                <div className='py-10 px-20 border border-zinc-400' key={index}>
                                    <p>{item.nombre_grado}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className='border border-zinc-400 mx-5'></div>
                    <div className='w-full'>
                        <h3 className='text-2xl mb-20'>Crear un nuevo Grado</h3>
                        <form onSubmit={handleCrearHorario}>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="grado">Grado</label>
                                    <input
                                        required
                                        id="grado"
                                        name="grado"
                                        className='p-2 border-2 border-zinc-400 rounded'
                                        type="text"
                                        value={grado}
                                        onChange={handleTipoTurnoChange}
                                    />
                                </div>
                                <button type="submit" className='py-2 px-4 bg-zinc-900 text-white rounded-md'>Crear Grado</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
