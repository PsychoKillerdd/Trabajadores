import type { WorkerProps } from "../interface";
import { v4 as uuid } from "uuid";

export const Workers:WorkerProps[] = [
    {
        rol: "Owner",
        nombre: "Juan",
        apellido: "Lucero",
        id: uuid(),
        local:"maipu"
    },
    {
        rol: "Encargado",
        nombre: "Tomas",
        apellido: "Zagal",
        id: uuid(),
        local:"maipu"

    },
    {
        rol: "Trabajador",
        nombre: "Ivan",
        apellido: "Vargas",
        id: uuid(),
        local:"maipu"

    },
    {
        rol: "Trabajador",
        nombre: "Luciano",
        apellido: "Vergara",
        id: uuid(),
        local:"Pudahuel"

    },
    {
        rol: "Trabajador",
        nombre: "Fabrizio",
        apellido: "Mercante",
        id: uuid(),
        local:"Pudahuel"
    },
]
