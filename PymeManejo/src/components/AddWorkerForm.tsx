import React from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  rol: string;
  nombre: string;
  apellido: string;
  local: string;
};

const roles = ["Trabajador", "Encargado", "Owner"];
const locales = ["Pudahuel", "Maipu"];

export const AddWorkerForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const addWorker = useStore((state) => state.addWorker);

  const onSubmit = (data: FormData) => {
    addWorker(data);
    toast.success(`Trabajador ${data.nombre} ${data.apellido} agregado!`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <div className="border-2 mb-2 shadow rounded-lg px-2 flex justify-between items-center ">
        <label>Rol:</label>
        <select className="border-2 "{...register("rol", { required: true })} defaultValue="">
          <option value="" disabled>Selecciona un rol</option>
          {roles.map((rol) => (
            <option key={rol} value={rol}>{rol}</option>
          ))}
        </select>
        {errors.rol && <span style={{ color: "red" }}>Requerido</span>}
      </div>
      <div className="border-2 mb-2 shadow rounded-lg px-2 flex justify-between items-center ">
        <label>Nombre:</label>
        <input {...register("nombre", { required: true })} />
        {errors.nombre && <span style={{ color: "red" }}>Requerido</span>}
      </div>
      <div className="border-2 mb-2 shadow rounded-lg px-2 flex justify-between items-center ">
        <label>Apellido:</label>
        <input {...register("apellido", { required: true })} />
        {errors.apellido && <span style={{ color: "red" }}>Requerido</span>}
      </div>
      <div className="border-2 mb-2 shadow rounded-lg px-2 flex justify-between items-center ">
        <label>Local:</label>
        <select className="border-2 " {...register("local", { required: true })} defaultValue="">
          <option  value="" disabled>Selecciona un local</option>
          {locales.map((local) => (
            <option  key={local} value={local}>{local}</option>
          ))}
        </select>
        {errors.local && <span style={{ color: "red" }}>Requerido</span>}
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 cursor-pointer px-5 py-3 border-lg rounded-lg items-center mt-5 mx-auto block uppercase text-white">Agregar Trabajador</button>
    </form>
  );
}; 