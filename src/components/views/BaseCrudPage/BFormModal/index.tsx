import { IFormField } from '@models/IFormField';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';
import FieldControlType from '@models/enums/FieldControlTypeEnum';
import React, { useEffect, useMemo, useState } from 'react';
import BModal from '../../../../components/ui/BModal';
import styles from './style.module.scss';

interface IBFormModal {
	show: boolean;
	closeModal: () => void;
	getById: any;
	formType: EntityChangeFormType;
	formFields: IFormField[];
	onSubmit: (...args: any) => void;
	style?: React.CSSProperties;
}

const BFormModal = (props: IBFormModal) => {
	const { show, closeModal, getById, formType, formFields, onSubmit, style } = props;

	const [formVal, setFormVal] = useState<any>({});

	const hadnleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit(formVal);
		closeModal();
	};

	const renderField = (field: IFormField) => {
		switch (field.controlType) {
			case FieldControlType.STRING:
				return (
					<div key={field.name + field.controlType}>
						<label>
							{field.name}:
							<input
								type='text'
								value={formVal && formVal[field.name] ? formVal[field.name] : ''}
								onChange={(e) => setFormVal({ ...formVal, [field.name]: e.target.value })}
							/>
						</label>
					</div>
				);
			case FieldControlType.NUMBER:
				return (
					<div key={field.name + field.controlType}>
						<label>
							{field.name}:
							<input
								type='number'
								value={formVal && formVal[field.name] ? formVal[field.name] : 0}
								onChange={(e) => setFormVal({ ...formVal, [field.name]: e.target.value })}
							/>
						</label>
					</div>
				);
			case FieldControlType.SELECTION:
				return (
					<div key={field.name + field.controlType}>
						<label>
							{field.name}:<select></select>
						</label>
					</div>
				);
			case FieldControlType.DATE:
				return (
					<div key={field.name + field.controlType}>
						<label>
							{field.name}:
							<input type='date' />
						</label>
					</div>
				);
			default:
				break;
		}
	};

	useEffect(() => {
		if (!getById) return;
		getById()
			.then((response: any) => {
				setFormVal(response.data);
			})
			.catch((error: any) => {
				console.log(error);
			});
	}, []);

	const submitBtnMemo = useMemo(() => {
		if (formType === EntityChangeFormType.UPDATE) return 'Редактировать';
		if (formType === EntityChangeFormType.DELETE) return 'Удалить';
		return 'Отправить';
	}, [formType]);

	return (
		<BModal show={show} closeModal={closeModal} style={style}>
			<form onSubmit={hadnleSubmit}>
				{formFields.map((item) => renderField(item))}
				<input className={styles['modal-button-submit']} type='submit' value={submitBtnMemo} />
			</form>
		</BModal>
	);
};

export default BFormModal;
