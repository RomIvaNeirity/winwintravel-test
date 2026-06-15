import { useTranslation } from 'react-i18next'

import { useFetchFilterData } from '@/shared/api/hooks/useFetchFilterData'
import { useFilterStore } from '@/shared/store/useFilterStore'

import { FilterModal } from '../../../pages/FiltersModal/FilterModal'

export const App = () => {
	const { t } = useTranslation('filter')
	const { activeFilters, openModal, isModalOpen } = useFilterStore()

	const { data: filterData, isLoading, isError } = useFetchFilterData()

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			<h1 className="text-6xl text-gray-600 mb-12">{t('title')}</h1>

			<button
				type="button"
				onClick={openModal}
				disabled={isLoading}
				className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
			>
				{isLoading ? 'Loading...' : t('open_filters')}
			</button>

			{isError && <p className="text-red-500 mt-4 font-medium">{t('error')}</p>}

			<div className="mt-12 w-full max-w-xl bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
				<p className="text-sm font-semibold text-gray-500 mb-2">
					{t('debug_title')}
				</p>
				<pre className="text-xs bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto font-mono">
					{JSON.stringify(activeFilters, null, 2)}
				</pre>
			</div>

			{isModalOpen && filterData && <FilterModal data={filterData} />}
		</section>
	)
}
