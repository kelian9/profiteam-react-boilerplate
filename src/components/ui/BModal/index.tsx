import closeIcon from '@assets/icons/close-icon.svg';
import React from 'react';
import styles from './style.module.scss';

interface IBModal {
	show: boolean;
	closeModal: () => void;
	children: any;
	style?: React.CSSProperties;
}

/* eslint-disable */
const BModal = (props: IBModal) => {
	const { show, closeModal, children, style } = props;

	if (!show) return null;

	return (
		<div className={styles['modal-container']} style={style} onClick={closeModal}>
			<div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
				<div className={styles['modal-body']}>{children}</div>
				<img src={closeIcon} alt='close' className={styles['modal-button-close']} onClick={closeModal} />
			</div>
		</div>
	);
};

export default BModal;
