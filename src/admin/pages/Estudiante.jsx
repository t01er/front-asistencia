import React, { useEffect, useState } from 'react'
import Header from '../Header'
export default function Estudiante() {

  const [grados, setGrados] = useState(null);
  const [secciones, setSecciones] = useState(null);
  const [turno, setTurno] = useState(null)



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
        const response = await fetch("http://localhost:3000/api/turno")
        const data = await response.json()
        setTurno(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTurno();
    fetchGrados();
    fetchSeccion();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch("http://localhost:3000/api/estudiante/", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Estudiante creado exitosamente'); 
      } else {
        console.error('Error al crear estudiante:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear estudiante:', error);
    }
  };
  return (
    <>
      <Header />
      <div className='max-w-6xl m-auto'>
        <h2 className='text-center text-2xl font-bold my-10'>Agregar Nuevo Alumno</h2>

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
                {/* <label className="text-[#35374B] font-bold " htmlFor="sexo">Sexo</label>
                <input required className='p-1 border rounded border-zinc-800' type="text" id="sexo" name="sexo" /> */}
                <label className='text-[#35374B] font-bold' htmlFor="sexo">Seleccione Sexo</label>
                <select className='p-1 rounded border-zinc-800 border' name="sexo" id='sexo'>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>

              <div className='col-span-2'>
                <div className='text-[#35374B] font-bold'>Grado</div>
                <select className='p-1 rounded border-zinc-800 border' name="id_grado">
                  <option value="id_grado">Seleccione un grado</option>
                  {grados?.map((grado) => (
                    <option key={grado.id_grado} value={grado.id_grado}>
                      {grado.nombre_grado}
                    </option>
                  ))}
                </select>
              </div>

              <div className='col-span-2'>
                <div className='text-[#35374B] font-bold'>Sección</div>
                <select className='p-1 rounded border-zinc-800 border' name="id_seccion">
                  <option value="id_seccion">Seleccione una sección</option>
                  {secciones?.map((seccion) => (
                    <option key={seccion.id_seccion} value={seccion.id_seccion}>
                      {seccion.nombre_seccion}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-span-2'>
                <div className='text-[#35374B] font-bold'>Turno</div>
                <select className='p-1 rounded border-zinc-800 border' name="id_horario" id="id_horario">
                  <option value="id_horario">Seleccione un Turno</option>
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
            <div className='py-2 px-4 my-5 bg-zinc-800 hover:bg-zinc-700 ease-out duration-300 text-white text-center flex items-center justify-center rounded-full' >
              <button type="submit">Crear</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
