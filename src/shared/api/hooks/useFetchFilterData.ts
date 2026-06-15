import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '../types/Filter/FilterItem'
import { FilterType } from '../types/Filter/FilterType'

interface FilterJsonData {
	filterItems: Array<{
		id: string
		name: string
		description?: string
		type: string
		allowAll?: boolean
		options: Array<{
			id: string
			name: string
			description?: string
		}>
	}>
}

const fetchFilters = async (): Promise<FilterItem[]> => {
	const module = await import('../../temp/filterData.json')
	const data = module.default as unknown as FilterJsonData

	return data.filterItems.map(item => ({
		...item,

		type: item.type as FilterType.OPTION
	})) as FilterItem[]
}

export const useFetchFilterData = () => {
	return useQuery<FilterItem[], Error>({
		queryKey: ['filterData'],
		queryFn: fetchFilters,
		staleTime: Infinity
	})
}
