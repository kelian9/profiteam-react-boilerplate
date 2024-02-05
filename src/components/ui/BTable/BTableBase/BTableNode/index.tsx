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
			case 'select':
				return <BSelect {...field.props}></BSelect>;
			case 'input':
				return <input {...field.props}></input>;
			case 'datepicker':
				return <input type='date' {...field.props}></input>;
			case 'checkbox':
				return <input type='checkbox' {...field.props}></input>;
			case 'custom':
				return field.template;
			default:
				return <span {...field.props}>{node[field.key]}</span>;
		}
	};

	const renderAction = (action: IAction<T>) => {
		if (!action?.template) {
			switch (action.type) {
				case 'save':
					return (
						<img
							src={saveIcon}
							alt='save'
							className={styles['node-actions-icon']}
							onClick={(e) => actionClickHandler(e, action.method)}
						/>
					);
				case 'edit':
					return (
						<img
							src={editIcon}
							alt='edit'
							className={styles['node-actions-icon']}
							onClick={(e) => actionClickHandler(e, action.method)}
						/>
					);
				case 'delete':
					return (
						<img
							src={deleteIcon}
							alt='delete'
							className={styles['node-actions-icon']}
							onClick={(e) => actionClickHandler(e, action.method)}
						/>
					);
				default:
					return <span onClick={(e) => actionClickHandler(e, action.method)}>{action.type}</span>;
			}
		}
		return action?.template;
	};

	return (
		<tr style={styleNode} onClick={(e) => rowClickHandler(e)}>
			{fields?.map((field, index) => <td key={index}>{renderField(field)}</td>)}
			{actions?.length && (
				<td>
					<div className={styles['node-actions']}>{actions.map((item) => renderAction(item))}</div>
				</td>
			)}
		</tr>
	);
};

export default BTableNode;
