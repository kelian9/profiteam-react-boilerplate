import BTableActionType from '@models/enums/BTableActionTypesEnum';
import FieldType from '@models/enums/FieldTypeEnum';
import React from 'react';
import deleteIcon from '../../../../../assets/images/icons/delete-icon.svg';
import editIcon from '../../../../../assets/images/icons/edit-icon.svg';
import BSelect from '../../../../../components/ui/BSelect';
import { IAction } from '../models/IAction';
import IBTableNodeProps from '../models/IBTableNode';
import { ITableField } from '../models/ITableField';
import styles from './style.module.scss';

type INodeBase = {
	[key: string]: any;
};

/* eslint-disable */
const BTableNode = <T extends INodeBase>(props: IBTableNodeProps<T>) => {
	const { node, fields, actions, rowClick, nodeStyle } = props;

	const rowClickHandler = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
		e.stopPropagation();
		if (rowClick) rowClick(node.id as number | string);
	};

	const actionClickHandler = (e: React.MouseEvent<HTMLImageElement | HTMLSpanElement, MouseEvent>, callback: any) => {
		e.stopPropagation();
		callback(node);
	};

	const renderField = (field: ITableField) => {
		switch (field.fieldType) {
			case FieldType.SELECT:
				return <BSelect {...field.props}></BSelect>;
			case FieldType.INPUT:
				return <input {...field.props}></input>;
			case FieldType.DATEPICKER:
				return <input type='date' {...field.props}></input>;
			case FieldType.CHECKBOX:
				return <input type='checkbox' {...field.props}></input>;
			case FieldType.RADIO:
				return <input type='radio' {...field.props}></input>;
			case FieldType.COMPONENT:
				return field.template;
			default:
				return <span {...field.props}>{node[field.keyName]}</span>;
		}
	};

	const renderAction = (action: IAction) => {
		switch (action.type) {
			case BTableActionType.EDIT:
				return (
					<img
						key={action.type}
						src={editIcon}
						alt='edit'
						className={styles['node-actions-icon']}
						onClick={(e) => actionClickHandler(e, action.method as () => void)}
					/>
				);
			case BTableActionType.DELETE:
				return (
					<img
						key={action.type}
						src={deleteIcon}
						alt='delete'
						className={styles['node-actions-icon']}
						onClick={(e) => actionClickHandler(e, action.method as () => void)}
					/>
				);
			case BTableActionType.CUSTOM:
			// if (!action.template) return;
			// action.template({ key: action.type, onClick: (e: any) => actionClickHandler(e, action.method) });
			default:
				break;
		}
	};

	return (
		<tr style={nodeStyle} onClick={(e) => rowClickHandler(e)}>
			{fields?.map((field, index) => <td key={index}>{renderField(field)}</td>)}
			{actions && (
				<td>
					<div className={styles['node-actions']}>{actions.map((item: IAction) => renderAction(item))}</div>
				</td>
			)}
		</tr>
	);
};

export default BTableNode;
