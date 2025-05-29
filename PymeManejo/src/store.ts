import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Workers } from './db/Workers'
import type { WorkerProps } from './interface'
import { v4 as uuid } from 'uuid'

interface StoreState {
  workers: WorkerProps[]
  addWorker: (worker: Omit<WorkerProps, "id">) => void
  removeWorker: (id: string) => void
}

export const useStore = create(
  persist<StoreState>(
    (set, get) => ({
      workers: [...Workers],
      addWorker: (worker) =>
        set({
          workers: [
            ...get().workers,
            { ...worker, id: uuid() }
          ]
        }),
      removeWorker: (id) =>
        set({
          workers: get().workers.filter((w) => w.id !== id)
        }),
    }),
    { name: 'Workers-storage' }
  )
)