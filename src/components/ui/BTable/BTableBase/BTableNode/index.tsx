import FieldType from '@models/enums/FieldTypeEnum';
import TableActionType from '@models/enums/TableActionTypesEnum';
import React from 'react';
import deleteIcon from '../../../../../assets/images/icons/delete-icon.svg';
import editIcon from '../../../../../assets/images/icons/edit-icon.svg';
import saveIcon from '../../../../../assets/images/icons/save-icon.svg';
import BSelect from '../../../../../components/ui/BSelect';
import { IAction } from '../models/IAction';
import IBTableNodeProps from '../models/IBTableNode';
import styles from './style.module.scss';

type INodeBase = {
	[key: string]: any;
};

const BTableNode = <T extends INodeBase>(props: IBTableNodeProps<T>) => {
	const { node, fields, actions, rowClick, styleNode } = props;

	const rowClickHandler = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
		e.stopPropagation();
		if (rowClick) rowClick(node.id as number | string);
	};

	const actionClickHandler = (
		e: React.MouseEvent<HTMLImageElement | HTMLSpanElement, MouseEvent>,
		callback: (element: T) => void,
	) => {
		e.stopPropagation();
		callback(node);
	};

	const renderField = (field: any) => {
		switch (field.type) {
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
				return <span {...field.props}>{node[field.key]}</span>;
		}
	};

	const renderAction = (action: IAction<T>) => {
		if (!action?.template) {
			switch (action.type) {
				case TableActionType.SAVE:
					return (
						<img
							key={action.type}
							src={saveIcon}
							alt='save'
							className={styles['node-actions-icon']}
							onClick={(e) => actionClickHandler(e, action.method)}
						/>
					);
				case TableActionType.EDIT:
					return (
						<img
							key={action.type}
							src={editIcon}
							alt='edit'
							className={styles['node-actions-icon']}
							onClick={(e) => actionClickHandler(e, action.method)}
						/>
					);
				case TableActionType.DELETE:
					return (
						<img
							key={action.type}
							src={deleteIcon}
							alt='delete'
							className={styles['node-actions-icon']}
							onClick={(e) => actionClickHandler(e, action.method)}
						/>
					);
				default:
					break;
			}
		}
		return action?.template;
	};

	return (
		<tr style={styleNode} onClick={(e) => rowClickHandler(e)}>
			{fields?.map((field, index) => <td key={index}>{renderField(field)}</td>)}
			{actions && (
				<td>
					<div className={styles['node-actions']}>
						{actions.map((item: IAction<T>) => renderAction(item))}
					</div>
				</td>
			)}
		</tr>
	);
};

export default BTableNode;
