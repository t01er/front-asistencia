import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { motion } from 'framer-motion';
export default function Estudiante() {
  const [grados, setGrados] = useState(null);
  const [secciones, setSecciones] = useState(null);
  const [turno, setTurno] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellido_p: '',
    apellido_m: '',
    numero_cel: '',
    sexo: 'M',
    id_grado: 'id_grado',
    id_seccion: 'id_seccion',
    id_horario: 'id_horario',
    image: null,
  });



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

    const fetchTurno = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/turno");
        const data = await response.json();
        setTurno(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTurno();
    fetchGrados();
    fetchSeccion();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formDataObject = new FormData(e.target);
  
    try {
      const response = await fetch("http://localhost:3000/api/estudiante/", {
        method: 'POST',
        body: formDataObject,
      });
  
      if (response.ok) {
        formData({
          dni: '',
          nombres: '',
          apellido_p: '',
          apellido_m: '',
          numero_cel: '',
          sexo: 'M',
          id_grado: 'id_grado',
          id_seccion: 'id_seccion',
          id_horario: 'id_horario',
          image: null,
        });
        setSuccessMessage('Estudiante creado exitosamente');
      } else {
        console.error('Error al crear estudiante:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear estudiante:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [successMessage]);

  return (
    <>
      <Header />
      <div className='max-w-6xl m-auto'>
        <h2 className='text-center text-2xl font-bold my-10'>Agregar Nuevo Alumno</h2>

        {successMessage && (
          <motion.div
            initial={{ scale: 0, }}
            animate={{ scale: 1, }}
            transition={{ duration: .4, ease: 'easeOut', }}
            className='text-black font-bold m-5 absolute bottom-0 left-0 bg-green-500 py-2 px-4 flex items-center rounded '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {successMessage}
          </motion.div>
        )}

        <div className='flex items-center justify-center'>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className='grid grid-col-6 gap-3'>
              <div className='col-span-3 flex flex-col'>
                <label className="text-[#35374B] font-bold " htmlFor="dni">Dni</label>
                <input required className='p-1 border rounded border-zinc-800' type="text" id="dni" name="dni" />
              </div>
              <div className='col-span-3 flex flex-col'>
                <label className="text-[#35374B] font-bold " htmlFor="nombres">Nombres</label>
                <input required className='p-1 border rounded border-zinc-800' type="text" id="nombres" name="nombres" />
              </div>
              <div className=' col-span-3 flex flex-col'>
                <label className="text-[#35374B] font-bold " htmlFor="apellido_p">Apellido Paterno</label>
                <input required className='p-1 border rounded border-zinc-800' type="text" id="apellido_p" name="apellido_p" />
              </div>
              <div className='col-span-3 flex flex-col'>
                <label className="text-[#35374B] font-bold " htmlFor="apellido_m">Apellido Materno</label>
                <input required className='p-1 border rounded border-zinc-800' type="text" id="apellido_m" name="apellido_m" />
              </div>

              <div className='col-span-3 flex flex-col'>
                <label className="text-[#35374B] font-bold " htmlFor="numero_cel">Celular</label>
                <input required className='p-1 border rounded border-zinc-800' type="text" id="numero_cel" name="numero_cel" />
              </div>
              <div className='col-span-3 flex flex-col'>                
                <label className='text-[#35374B] font-bold' htmlFor="sexo">Seleccione Genero</label>
                <select className='p-1 rounded border-zinc-800 border' name="sexo" id='sexo'>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>

              <div className='col-span-2'>
                <div className='text-[#35374B] font-bold'>Grado</div>
                <select required className='p-1 rounded border-zinc-800 border' name="id_grado">
                  <option disabled value="id_grado">Seleccione un grado</option>
                  {grados?.map((grado) => (
                    <option key={grado.id_grado} value={grado.id_grado}>
                      {grado.nombre_grado}
                    </option>
                  ))}
                </select>
              </div>

              <div className='col-span-2'>
                <div className='text-[#35374B] font-bold'>Sección</div>
                <select required className='p-1 rounded border-zinc-800 border' name="id_seccion">
                  <option disabled value="id_seccion">Seleccione una sección</option>
                  {secciones?.map((seccion) => (
                    <option key={seccion.id_seccion} value={seccion.id_seccion}>
                      {seccion.nombre_seccion}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-span-2'>
                <div className='text-[#35374B] font-bold'>Turno</div>
                <select required className='p-1 rounded border-zinc-800 border' name="id_horario" id="id_horario">
                  <option disabled value="id_horario">Seleccione un Turno</option>
                  {turno?.map((turno) => (
                    <option key={turno.id_horario} value={turno.id_horario}>
                      {turno.turno}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-span-6 flex flex-col'>
                <label className="text-[#35374B] font-bold " htmlFor="image">Foto</label>
                <input required className='p-1 border rounded border-zinc-800' type="file" id="image" name="image" accept="image/*" />
              </div>
            </div>
            <div className='' >
              <button className='py-2 px-4 my-5 bg-zinc-800 hover:bg-zinc-700 ease-out duration-300 text-white text-center flex items-center justify-center rounded-full w-full' type="submit">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
