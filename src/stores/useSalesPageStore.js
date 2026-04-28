import { create } from 'zustand'

const useSalesPageStore = create((set) => ({
  pages: [],
  currentPage: null,
  pagination: null,
  setPages: ({ pages, pagination }) => set({ pages, pagination }),
  setCurrentPage: (page) => set({ currentPage: page }),
  removePage: (id) =>
    set((state) => ({
      pages: state.pages.filter((page) => page.id !== id),
      currentPage: state.currentPage?.id === id ? null : state.currentPage,
    })),
}))

export default useSalesPageStore
