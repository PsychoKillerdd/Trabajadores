import React from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  local: string;
};

const categorias = ["Papelería", "Aseo", "Alimentos"];
const locales = ["Villa Alemana", "Maipu", "Pudahuel"];

export const AddProductForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const addProduct = useStore((state) => state.addProduct);

  const onSubmit = (data: FormData) => {
    addProduct({
      ...data,
      precio: Number(data.precio),
      stock: Number(data.stock)
    });
    toast.success(`Producto ${data.nombre} agregado!`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white border border-lime-400 rounded-2xl shadow-2xl p-8 flex flex-col gap-4 mt-8">
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-lime-900">Nombre:</label>
        <input className="border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" {...register("nombre", { required: true })} />
        {errors.nombre && <span className="text-red-500 text-xs">Requerido</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-lime-900">Categoría:</label>
        <select className="border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" {...register("categoria", { required: true })} defaultValue="">
          <option value="" disabled>Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.categoria && <span className="text-red-500 text-xs">Requerido</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-lime-900">Precio:</label>
        <input type="number" min={1} step={1} className="border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" {...register("precio", { required: true, min: 1 })} />
        {errors.precio && <span className="text-red-500 text-xs">Requerido</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-lime-900">Stock:</label>
        <input type="number" min={1} step={1} className="border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" {...register("stock", { required: true, min: 1 })} />
        {errors.stock && <span className="text-red-500 text-xs">Requerido</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-lime-900">Local:</label>
        <select className="border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400" {...register("local", { required: true })} defaultValue="">
          <option value="" disabled>Selecciona un local</option>
          {locales.map((local) => (
            <option key={local} value={local}>{local}</option>
          ))}
        </select>
        {errors.local && <span className="text-red-500 text-xs">Requerido</span>}
      </div>
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow mt-5 w-full transition-all">Agregar Producto</button>
    </form>
  );
}; 