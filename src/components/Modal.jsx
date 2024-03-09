import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Modal = ({ isOpen, onClose, message }) => {
  const [credentials, setCredentials] = useState({
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.correo || !credentials.contrasena) {
      setError("Por favor, ingrese nombre de usuario y contraseña");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/login", credentials);

      if (response.status === 200) {       
        const responseData = response.data;      
        window.location.href = "/admin";
      } else {
        // Manejar otros códigos de estado
        if (response.status === 400) {
          setError("Correo y contraseña son requeridos");
        } else if (response.status === 401) {
          setError("Contraseña incorrecta");
        } else if (response.status === 404) {
          setError("Usuario no encontrado");
        } else {
          setError("Error desconocido en la solicitud de inicio de sesión");
        }
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error(error.response);
      setError("Error al realizar la solicitud de inicio de sesión");
      console.error("Error al realizar la solicitud de inicio de sesión", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-md"
            initial={{ y: "-50%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-50%" }}
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 1.05 }}
              className="close-btn absolute top-2 right-2"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Agrega tu formulario aquí */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-center">Log In</h3>
              </div>
              <div>
                <label className="block font-bold text-zinc-800">Usuario</label>
                <div className="flex gap-2 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <input onChange={handleChange} type="text" name="correo" className="border py-2 px-4 rounded w-full outline-zinc-500" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-zinc-800">Contraseña</label>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <input onChange={handleChange} type="password" name="contrasena" className="border py-2 px-4 rounded w-full outline-zinc-500" />
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <motion.button
                whileTap={{ scale: 1.05 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700 ease-out duration-300"
              >
                Entrar
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
