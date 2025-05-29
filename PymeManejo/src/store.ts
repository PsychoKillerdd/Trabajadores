import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Products } from './db/Products'
import type { ProductProps } from './interface'
import { v4 as uuid } from 'uuid'

interface StoreState {
  products: ProductProps[]
  addProduct: (product: Omit<ProductProps, "id">) => void
  removeProduct: (id: string) => void
  increaseStock: (id: string) => void
  decreaseStock: (id: string) => void
}

export const useStore = create(
  persist<StoreState>(
    (set, get) => ({
      products: [...Products],
      addProduct: (product) =>
        set({
          products: [
            ...get().products,
            { ...product, id: uuid() }
          ]
        }),
      removeProduct: (id) =>
        set({
          products: get().products.filter((p) => p.id !== id)
        }),
      increaseStock: (id) =>
        set({
          products: get().products.map((p) =>
            p.id === id ? { ...p, stock: p.stock + 1 } : p
          )
        }),
      decreaseStock: (id) =>
        set({
          products: get().products
            .map((p) =>
              p.id === id ? { ...p, stock: p.stock - 1 } : p
            )
            .filter((p) => p.stock >= 1)
        }),
    }),
    { name: 'Products-storage' }
  )
)