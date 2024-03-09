import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [showReports, setShowReports] = useState(false);
    const [showAcademic, setShowAcademic] = useState(false);

    const handleReportsClick = () => {
        setShowReports(!showReports);
    };

    const handleAcademicClick = () => {
        setShowAcademic(!showAcademic);
    };

    return (
        <>
            <header className='bg-[#35374B] text-white py-7'>
                <nav className='flex justify-between items-center max-w-6xl m-auto'>
                    <h2 className='text-2xl font-bold'>Logo</h2>
                    <ul className='flex items-center gap-24'>
                        <li><Link to={"/admin"}>Inicio</Link></li>
                        <li>
                            <button onClick={handleReportsClick}>Reportes</button>
                            <ul className={showReports ? 'absolute z-50 bg-[#283142] mt-3' : 'hidden'}>
                                <li className='border-b border-white/20 hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/alumno'>Alumno</Link></li>
                                <li className='border-b border-white/20 hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/grado'>Grado & Sección</Link></li>
                                <li className='border-b border-white/20 hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/general'>General</Link></li>
                            </ul>
                        </li>
                        <li>
                            <button onClick={handleAcademicClick}>Registrar</button>
                            <ul className={showAcademic ? 'absolute z-50 bg-[#283142] mt-3' : 'hidden'}>
                                <li className='border-b border-white/20  hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/estudiante'>Estudiante</Link></li>
                                <li className='border-b border-white/20  hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/turno'>Turno</Link></li>
                                <li className='border-b border-white/20  hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/grado-gestion'>Grado</Link></li>
                                <li className='border-b border-white/20  hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/seccion'>Seccion</Link></li>
                                <li className='border-b border-white/20  hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/falta'>Falta</Link></li>
                                <li className='border-b border-white/20  hover:bg-[#394355]'><Link className='flex-grow flex py-2 px-4' to='/permisos'>Permisos</Link></li>
                            </ul>
                        </li>
                        <li><Link>Perfil</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
