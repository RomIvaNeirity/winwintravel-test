import { useTranslation } from 'react-i18next'

interface ConfirmModalProps {
	onApplyNew: () => void
	onUseOld: () => void
	onClose: () => void
}

export const ConfirmModal = ({
	onApplyNew,
	onUseOld,
	onClose
}: ConfirmModalProps) => {
	const { t } = useTranslation('filter')

	return (
		<div
			className="modal-overlay"
			onClick={onClose}
		>
			<div
				className="modal-content"
				onClick={e => e.stopPropagation()}
			>
				<div className="confirm_message">
					<h2>{t('confirm_modal.confirm_message')}</h2>
					<button
						type="button"
						onClick={onClose}
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

				<div className="confirm-msg-btns">
					<button
						type="button"
						onClick={onUseOld}
						className="btn-old"
					>
						{t('confirm_modal.use_old', 'Use old filter')}
					</button>
					<button
						type="button"
						onClick={onApplyNew}
						className="btn-apply-confirm"
					>
						{t('confirm_modal.apply_new')}
					</button>
				</div>
			</div>
		</div>
	)
}
