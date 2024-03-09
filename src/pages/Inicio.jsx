import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Reloj from "../components/Reloj";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Inicio() {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("reader", {      
      fps: 5,
      aspectRatio: 1,
      disableFlip: true,
      disableSpinning: true,
      colorDark: "red",
      colorLight: "#ffffff",
    });

    scannerRef.current.render(qrCodeSuccessCallback);

    function qrCodeSuccessCallback(decodedText) {
      setScanResult(decodedText);
      sendAttendanceData(decodedText);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const sendAttendanceData = async (dni) => {
    try {
      const response = await axios.post("http://localhost:3000/api/asistencia", { dni });
      console.log("Registro de asistencia exitoso:", response.data);

      if (response.data.success === false) {
        setModalMessage("Ya te has registrado hoy");
        setModalOpen(true);
      } else {
        setStudentInfo(response.data.studentInfo);
        console.log(setStudentInfo)
        setShowInfo(true);
        setTimeout(() => {
          setShowInfo(false);
        }, 30000);
      }
    } catch (error) {
      console.error("Error al registrar la asistencia:", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage("");
  };

  // abrir modal

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "ñ") {
        openModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openModal = () => {
    setModalOpen(true);
    setModalMessage("Modal abierto con atajo de teclado Ctrl + ñ");
  };

  return (
    <>
      <main className="max-w-7xl m-auto flex items-start justify-center h-screen overflow-hidden">
        <div className="flex  flex-col justify-between items-center gap-4">

          <section className="w-full">
            <div className="flex flex-col gap-10">
              <div className="flex gap-2 text-7xl font-extrabold justify-center">
                <Reloj />
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="flex items-center justify-center text-center text-3xl font-bold ">                      
            </div>
            {showInfo ? (
              <div className="flex items-center justify-center gap-6">
                <div>
                  <img
                    className="w-28 h-28 object-cover rounded-full"
                    src={studentInfo.url}
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-4xl font-black w-96">
                    {studentInfo.nombres}
                  </h2>
                  <h2 className="text-4xl font-black w-96">
                    {studentInfo.apellido_p}
                  </h2>
                  <h2 className="text-4xl font-black w-96">
                    {studentInfo.apellido_m}
                  </h2>

                  {/* Other user information */}
                  <div className=" bg-blue-600 inline-block py-2 px-4 rounded-full mt-5">
                    <p className=" text-white flex gap-2 items-center justify-center ">
                      Registro Exitoso{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-6">
                  <div>
                    <img
                      className=" w-28 h-28 bg-zinc-400 object-cover rounded-full animate-pulse"
                      src=""
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black w-60 h-5  mb-2 bg-zinc-400 animate-pulse rounded-full ">

                    </h2>
                    <h2 className="text-4xl font-black w-32 h-5  mb-2 bg-zinc-400  animate-pulse rounded-full">

                    </h2>
                    <h2 className="text-4xl font-black w-52 h-5  mb-2 bg-zinc-400  animate-pulse rounded-full">

                    </h2>

                  </div>
                </div>
              </>
            )}
          </section>

          <section className=" w-80 h-80 overflow-hidden ">
            <div className="flex justify-center">
              <div id="reader"></div>
            </div>
          </section>

        </div>

      </main>
      {/* <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} /> */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
    </>
  );
}
