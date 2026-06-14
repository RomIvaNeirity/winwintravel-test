import { create } from 'zustand'

import { SearchRequestFilter } from '../api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	isModalOpen: boolean
	activeFilters: SearchRequestFilter
	openModal: () => void
	closeModal: () => void
	setFilters: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>(set => ({
	isModalOpen: false,
	activeFilters: [],
	openModal: () => set({ isModalOpen: true }),
	closeModal: () => set({ isModalOpen: false }),
	setFilters: filters => set({ activeFilters: filters })
}))
