import closeIcon from '@assets/icons/close-icon.svg';
import { IFormField } from '@models/IFormField';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';
import FieldControlType from '@models/enums/FieldControlTypeEnum';
import React from 'react';
import styles from './style.module.scss';

interface IBModal {
	show: boolean;
	onCloseButtonClick: () => void;
	onSubmit: (...args: any) => void;
	fields: IFormField[];
	formType: EntityChangeFormType;
	style?: React.CSSProperties;
}

/* eslint-disable */
const Modal = (props: IBModal) => {
	const { show, onCloseButtonClick, onSubmit, fields, formType, style } = props;

	if (!show) return null;

	const hadnleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit(e);
	};

	const renderFormFields = (field: IFormField) => {
		switch (field.controlType) {
			case FieldControlType.STRING:
				return (
					<div>
						<label>
							{field.name}:
							<input
								key={'field' + field.name + formType}
								name={field.name}
								type='text'
							>
							</input>
						</label>
					</div>
				)
			case FieldControlType.NUMBER:
				return (
					<div>
						<label>
							{field.name}:
							<input
								key={'field' + field.name + formType}
								name={field.name}
								type='number'
							>
							</input>
						</label>
					</div>
				)
			case FieldControlType.SELECTION:
				return (
					<div>
						<label>
							{field.name}:
							<select
								key={'field' + field.name + formType}
								name={field.name}
							>
							</select>
						</label>
					</div>
				)
			default:
				break;
		}
	};

	return (
		<div className={styles['modal-container']} style={style} onClick={onCloseButtonClick}>
			<div className={styles['modal']} onClick={(e) => e.stopPropagation()}>
				<div className={styles['modal-body']}>
					<form onSubmit={hadnleSubmit}>
						{fields?.map((item) => renderFormFields(item))}
						<input type="submit" value="Отправить" />
					</form>
				</div>
				<img src={closeIcon} alt='close' className={styles['modal-button']} onClick={onCloseButtonClick} />
			</div>
		</div>
	);
};

export default Modal;
