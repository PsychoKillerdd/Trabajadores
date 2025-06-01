import { AddProductForm } from "./components/AddWorkerForm";
import { useStore } from "./store";
import { ToastContainer, toast } from "react-toastify";
import { LoginModal } from "./components/LoginModal";
import { useState } from "react";

const categorias = ["Todas", "Papelería", "Aseo", "Alimentos"];
const locales = ["Todos", "Villa Alemana", "Maipu", "Pudahuel"];

function App() {
  const products = useStore((state) => state.products);
  const removeProduct = useStore((state) => state.removeProduct);
  const increaseStock = useStore((state) => state.increaseStock);
  const decreaseStock = useStore((state) => state.decreaseStock);
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroLocal, setFiltroLocal] = useState("Todos");
  const [isLogged, setIsLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleRemove = (id: string, nombre: string) => {
    removeProduct(id);
    toast.info(`Producto ${nombre} eliminado.`);
  };

  // Filtrar productos según los filtros seleccionados
  const filteredProducts = products.filter((p) => {
    const matchCategoria = filtroCategoria === "Todas" || p.categoria === filtroCategoria;
    const matchLocal = filtroLocal === "Todos" || p.local.toLowerCase() === filtroLocal.toLowerCase();
    return matchCategoria && matchLocal;
  });

  // Separar por local
  const villaAlemanaProducts = filteredProducts.filter((p) => p.local.toLowerCase() === "villa alemana");
  const maipuProducts = filteredProducts.filter((p) => p.local.toLowerCase() === "maipu");
  const pudahuelProducts = filteredProducts.filter((p) => p.local.toLowerCase() === "pudahuel");

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
      <h1 className="text-4xl font-extrabold text-center mb-10 mt-8 tracking-tight ">Agregar Producto</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-10 mb-12 border border-gray-200">
        {isLogged ? (
          <AddProductForm />
        ) : (
          <div className="text-center text-gray-500 text-lg">Debes iniciar sesión para agregar productos.</div>
        )}
      </div>
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-6 justify-center items-center">
        <div>
          <label className="mr-2 font-semibold">Filtrar por Categoría:</label>
          <select
            className="border rounded px-3 py-2 text-lg"
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
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
      <div className="w-full flex flex-col gap-10 justify-center items-stretch px-4">
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Villa Alemana</h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200 min-w-[600px]">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-4 px-6 text-lg">Nombre</th>
                  <th className="py-4 px-6 text-lg">Categoría</th>
                  <th className="py-4 px-6 text-lg">Precio</th>
                  <th className="py-4 px-6 text-lg">Stock</th>
                  <th className="py-4 px-6 text-lg">Acción</th>
                </tr>
              </thead>
              <tbody>
                {villaAlemanaProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 text-lg">Sin productos</td>
                  </tr>
                ) : (
                  villaAlemanaProducts.map(p => (
                    <tr key={p.id} className="border-b hover:bg-lime-50 transition-all">
                      <td className="py-4 px-6 text-lg">{p.nombre}</td>
                      <td className="py-4 px-6 text-lg">{p.categoria}</td>
                      <td className="py-4 px-6 text-lg">${p.precio}</td>
                      <td className="py-4 px-6 text-lg flex flex-row items-center gap-2 justify-center">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => increaseStock(p.id)}
                        >
                          +
                        </button>
                        <span className="font-bold text-lime-900">{p.stock}</span>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => decreaseStock(p.id)}
                        >
                          -
                        </button>
                      </td>
                      <td className="py-4 px-6 text-lg">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => handleRemove(p.id, p.nombre)}
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
          <h2 className="text-2xl font-bold mb-4 text-green-700">Maipu</h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200 min-w-[600px]">
              <thead>
                <tr className="bg-green-100">
                  <th className="py-4 px-6 text-lg">Nombre</th>
                  <th className="py-4 px-6 text-lg">Categoría</th>
                  <th className="py-4 px-6 text-lg">Precio</th>
                  <th className="py-4 px-6 text-lg">Stock</th>
                  <th className="py-4 px-6 text-lg">Acción</th>
                </tr>
              </thead>
              <tbody>
                {maipuProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 text-lg">Sin productos</td>
                  </tr>
                ) : (
                  maipuProducts.map(p => (
                    <tr key={p.id} className="border-b hover:bg-lime-50 transition-all">
                      <td className="py-4 px-6 text-lg">{p.nombre}</td>
                      <td className="py-4 px-6 text-lg">{p.categoria}</td>
                      <td className="py-4 px-6 text-lg">${p.precio}</td>
                      <td className="py-4 px-6 text-lg flex flex-row items-center gap-2 justify-center">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => increaseStock(p.id)}
                        >
                          +
                        </button>
                        <span className="font-bold text-lime-900">{p.stock}</span>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => decreaseStock(p.id)}
                        >
                          -
                        </button>
                      </td>
                      <td className="py-4 px-6 text-lg">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => handleRemove(p.id, p.nombre)}
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
          <h2 className="text-2xl font-bold mb-4 text-purple-700">Pudahuel</h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-2xl border border-gray-200 min-w-[600px]">
              <thead>
                <tr className="bg-purple-100">
                  <th className="py-4 px-6 text-lg">Nombre</th>
                  <th className="py-4 px-6 text-lg">Categoría</th>
                  <th className="py-4 px-6 text-lg">Precio</th>
                  <th className="py-4 px-6 text-lg">Stock</th>
                  <th className="py-4 px-6 text-lg">Acción</th>
                </tr>
              </thead>
              <tbody>
                {pudahuelProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 text-lg">Sin productos</td>
                  </tr>
                ) : (
                  pudahuelProducts.map(p => (
                    <tr key={p.id} className="border-b hover:bg-lime-50 transition-all">
                      <td className="py-4 px-6 text-lg">{p.nombre}</td>
                      <td className="py-4 px-6 text-lg">{p.categoria}</td>
                      <td className="py-4 px-6 text-lg">${p.precio}</td>
                      <td className="py-4 px-6 text-lg flex flex-row items-center gap-2 justify-center">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => increaseStock(p.id)}
                        >
                          +
                        </button>
                        <span className="font-bold text-lime-900">{p.stock}</span>
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => decreaseStock(p.id)}
                        >
                          -
                        </button>
                      </td>
                      <td className="py-4 px-6 text-lg">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow transition-all mx-1"
                          onClick={() => handleRemove(p.id, p.nombre)}
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
