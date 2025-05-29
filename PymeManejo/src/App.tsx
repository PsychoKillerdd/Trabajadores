import { AddWorkerForm } from "./components/AddWorkerForm";
import { useStore } from "./store";
import { ToastContainer, toast } from "react-toastify";
import { LoginModal } from "./components/LoginModal";
import { useState } from "react";

const roles = ["Todos", "Trabajador", "Encargado", "Owner"];
const locales = ["Todos", "Maipu", "Pudahuel"];

function App() {
  const workers = useStore((state) => state.workers);
  const removeWorker = useStore((state) => state.removeWorker);
  const [filtroRol, setFiltroRol] = useState("Todos");
  const [filtroLocal, setFiltroLocal] = useState("Todos");
  const [isLogged, setIsLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleRemove = (id: string, nombre: string, apellido: string) => {
    removeWorker(id);
    toast.info(`Trabajador ${nombre} ${apellido} eliminado.`);
  };

  // Filtrar trabajadores según los filtros seleccionados
  const filteredWorkers = workers.filter((w) => {
    const matchRol = filtroRol === "Todos" || w.rol === filtroRol;
    const matchLocal = filtroLocal === "Todos" || w.local.toLowerCase() === filtroLocal.toLowerCase();
    return matchRol && matchLocal;
  });

  // Separar por local
  const maipuWorkers = filteredWorkers.filter((w) => w.local.toLowerCase() === "maipu");
  const pudahuelWorkers = filteredWorkers.filter((w) => w.local.toLowerCase() === "pudahuel");

  const handleLoginSuccess = () => {
    setIsLogged(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLogged(false);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      <div className="fixed top-6 right-8 z-40">
        {isLogged && (
          <button
            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 text-white px-6 py-2 rounded-full font-bold shadow-lg text-lg"
            onClick={handleLogout}
          >
            Salir
          </button>
        )}
      </div>
      <h1 className="text-4xl font-extrabold text-center mb-10 mt-8 tracking-tight ">Agregar Trabajador</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 mb-12 border border-gray-200">
        {isLogged ? (
          <AddWorkerForm />
        ) : (
          <div className="text-center text-gray-500 text-lg">Debes iniciar sesión para agregar trabajadores.</div>
        )}
      </div>
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-6 justify-center items-center">
        <div>
          <label className="mr-2 font-semibold">Filtrar por Rol:</label>
          <select
            className="border rounded px-3 py-2 text-lg"
            value={filtroRol}
            onChange={e => setFiltroRol(e.target.value)}
          >
            {roles.map(rol => (
              <option key={rol} value={rol}>{rol}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Filtrar por Local:</label>
          <select
            className="border rounded px-3 py-2 text-lg"
            value={filtroLocal}
            onChange={e => setFiltroLocal(e.target.value)}
          >
            {locales.map(local => (
              <option key={local} value={local}>{local}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-10 justify-center items-stretch px-4">
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Maipu</h2>
          <div className="w-full">
            <table className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-4 px-6 text-lg">Nombre</th>
                  <th className="py-4 px-6 text-lg">Apellido</th>
                  <th className="py-4 px-6 text-lg">Rol</th>
                  <th className="py-4 px-6 text-lg">Acción</th>
                </tr>
              </thead>
              <tbody>
                {maipuWorkers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400 text-lg">Sin trabajadores</td>
                  </tr>
                ) : (
                  maipuWorkers.map(w => (
                    <tr key={w.id} className="border-b">
                      <td className="py-4 px-6 text-lg">{w.nombre}</td>
                      <td className="py-4 px-6 text-lg">{w.apellido}</td>
                      <td className="py-4 px-6 text-lg">{w.rol}</td>
                      <td className="py-4 px-6 text-lg">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow"
                          onClick={() => handleRemove(w.id, w.nombre, w.apellido)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Pudahuel</h2>
          <div className="w-full">
            <table className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200">
              <thead>
                <tr className="bg-green-100">
                  <th className="py-4 px-6 text-lg">Nombre</th>
                  <th className="py-4 px-6 text-lg">Apellido</th>
                  <th className="py-4 px-6 text-lg">Rol</th>
                  <th className="py-4 px-6 text-lg">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pudahuelWorkers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400 text-lg">Sin trabajadores</td>
                  </tr>
                ) : (
                  pudahuelWorkers.map(w => (
                    <tr key={w.id} className="border-b">
                      <td className="py-4 px-6 text-lg">{w.nombre}</td>
                      <td className="py-4 px-6 text-lg">{w.apellido}</td>
                      <td className="py-4 px-6 text-lg">{w.rol}</td>
                      <td className="py-4 px-6 text-lg">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow"
                          onClick={() => handleRemove(w.id, w.nombre, w.apellido)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
