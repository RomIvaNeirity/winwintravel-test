import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem } from '@/shared/api/types/Filter/FilterItem'
import { FilterType } from '@/shared/api/types/Filter/FilterType'
import { SearchRequestOptions } from '@/shared/api/types/SearchRequest/SearchRequestFilter'
import { useFilterStore } from '@/shared/store/useFilterStore'

interface FilterModalProps {
	data: FilterItem[]
}

export const FilterModal = ({ data }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { activeFilters, setFilters, closeModal } = useFilterStore()

	const [localFilters, setLocalFilters] =
		useState<SearchRequestOptions[]>(activeFilters)

	const isOptionChecked = (filterId: string, optionId: string): boolean => {
		const currentFilter = localFilters.find(
			filterItem => filterItem.id === filterId
		)
		return currentFilter ? currentFilter.optionsIds.includes(optionId) : false
	}

	const handleCheckboxChange = (filterId: string, optionId: string) => {
		setLocalFilters(prev => {
			const existingFilter = prev.find(filterItem => filterItem.id === filterId)

			if (!existingFilter) {
				return [
					...prev,
					{ id: filterId, type: FilterType.OPTION, optionsIds: [optionId] }
				]
			}

			const isChecked = existingFilter.optionsIds.includes(optionId)
			const updatedOptionsIds = isChecked
				? existingFilter.optionsIds.filter(id => id !== optionId)
				: [...existingFilter.optionsIds, optionId]

			if (updatedOptionsIds.length === 0) {
				return prev.filter(filterItem => filterItem.id !== filterId)
			}

			return prev.map(filterItem =>
				filterItem.id === filterId
					? { ...filterItem, optionsIds: updatedOptionsIds }
					: filterItem
			)
		})
	}

	const handleApply = () => {
		const isConfirmed = window.confirm(t('modal.confirm_message'))
		if (isConfirmed) {
			setFilters(localFilters) // зберігаємо в глобальний Zustand стор
			closeModal()
		}
	}

	return (
		<div
			className="modal-overlay"
			onClick={closeModal}
		>
			<div
				className="modal-content"
				onClick={e => e.stopPropagation()}
			>
				<div className="modal-header">
					<h2>{t('modal.title')}</h2>
					<button
						type="button"
						onClick={closeModal}
						className="modal-close"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M24 0L0 24M0 0L24 24"
								stroke="var(--black-grey\.500, #1E293B)"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>

				<div className="modal-body">
					{data.map(filter => (
						<div
							key={filter.id}
							className="filter-section"
						>
							<h3 className="filter-title">{filter.name}</h3>
							<div className="options-list">
								{filter.options.map(option => (
									<label
										key={option.id}
										className="option-item"
									>
										<input
											type="checkbox"
											className="checkbox-input"
											checked={isOptionChecked(filter.id, option.id)}
											onChange={() =>
												handleCheckboxChange(filter.id, option.id)
											}
										/>
										<span className="option-label">{option.name}</span>
									</label>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Футер модалки */}
				<div className="modal-footer">
					<button
						type="button"
						onClick={closeModal}
						className="btn-cancel"
					>
						{t('modal.cancel')}
					</button>
					<button
						type="button"
						onClick={handleApply}
						className="btn-apply"
					>
						{t('modal.apply')}
					</button>
				</div>
			</div>
		</div>
	)
}
