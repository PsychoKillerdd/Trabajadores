import type { ProductProps } from "../interface";
import { v4 as uuid } from "uuid";

export const Products: ProductProps[] = [
  {
    id: uuid(),
    nombre: "Cuaderno 100 hojas",
    categoria: "Papelería",
    precio: 1500,
    stock: 20,
    local: "Villa Alemana"
  },
  {
    id: uuid(),
    nombre: "Lápiz Pasta Azul",
    categoria: "Papelería",
    precio: 300,
    stock: 50,
    local: "Maipu"
  },
  {
    id: uuid(),
    nombre: "Resma de Papel A4",
    categoria: "Papelería",
    precio: 3500,
    stock: 10,
    local: "Pudahuel"
  },
  {
    id: uuid(),
    nombre: "Detergente 1L",
    categoria: "Aseo",
    precio: 1200,
    stock: 15,
    local: "Maipu"
  },
  {
    id: uuid(),
    nombre: "Escoba",
    categoria: "Aseo",
    precio: 1800,
    stock: 8,
    local: "Villa Alemana"
  },
  {
    id: uuid(),
    nombre: "Cloro 2L",
    categoria: "Aseo",
    precio: 900,
    stock: 12,
    local: "Pudahuel"
  },
  {
    id: uuid(),
    nombre: "Arroz 1kg",
    categoria: "Alimentos",
    precio: 1100,
    stock: 25,
    local: "Maipu"
  },
  {
    id: uuid(),
    nombre: "Fideos Spaghetti",
    categoria: "Alimentos",
    precio: 950,
    stock: 30,
    local: "Villa Alemana"
  },
  {
    id: uuid(),
    nombre: "Azúcar 1kg",
    categoria: "Alimentos",
    precio: 1200,
    stock: 18,
    local: "Pudahuel"
  },
  {
    id: uuid(),
    nombre: "Aceite 900ml",
    categoria: "Alimentos",
    precio: 2200,
    stock: 10,
    local: "Maipu"
  }
];
