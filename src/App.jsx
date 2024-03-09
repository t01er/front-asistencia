import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/NotFound"
import Admin from "./admin/Admin"
import Alumnos from "./admin/pages/Alumnos"
import GradosSeccion from "./admin/pages/GradosSeccion"
import General from "./admin/pages/General"
import Turno from "./admin/pages/Turno"
import Inicio from "./pages/Inicio"
import Grado from "./admin/pages/Grado"
import Seccion from "./admin/pages/Seccion"
import Estudiante from "./admin/pages/Estudiante"
import Faltas from "./admin/pages/Faltas"
import Permisos from "./admin/pages/Permisos"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/alumno" element={<Alumnos />} />
          <Route path="/grado" element={<GradosSeccion />} />
          <Route path="/general" element={<General />} />
          <Route path="/turno" element={<Turno />} />
          <Route path="/grado-gestion" element={<Grado />} />
          <Route path="/seccion" element={<Seccion />} />
          <Route path="/estudiante" element={<Estudiante />} />
          <Route path="/falta" element={<Faltas />} />
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App