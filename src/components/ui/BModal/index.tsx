import closeIcon from '@assets/icons/close-icon.svg';
import React from 'react';
import styles from './style.module.scss';

interface IBModal {
	show: boolean;
	onCloseButtonClick: () => void;
	style?: React.CSSProperties;
}

const Modal = (props: IBModal) => {
	const { show, onCloseButtonClick, style } = props;

	if (!show) return null;

	return (
		<div className={styles['modal-container']} style={style} onClick={onCloseButtonClick}>
			<div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
				<div className={styles['modal-body']}></div>
				<img src={closeIcon} alt='close' className={styles['modal-button']} onClick={onCloseButtonClick} />
			</div>
		</div>
	);
};

export default Modal;
