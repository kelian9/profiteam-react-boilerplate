import React from 'react';
import deleteIcon from '../../../../../assets/images/icons/delete-icon.svg';
import editIcon from '../../../../../assets/images/icons/edit-icon.svg';
import saveIcon from '../../../../../assets/images/icons/save-icon.svg';
import BSelect from '../../../../../components/ui/BSelect';
import IBTableNodeProps from '../models/IBTableNode';
import styles from './style.module.scss';

const BTableNode = (props: IBTableNodeProps) => {
	const { node, fields, actions, rowClick, styleNode } = props;
	type INode = ReturnType<typeof node>['node'];

	const rowClickHandler = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
		e.stopPropagation();
		if (rowClick) rowClick(node.id);
	};

	/* eslint-disable */
	const actionClickHandler = (
		e: React.MouseEvent<HTMLImageElement | HTMLSpanElement, MouseEvent>,
		callback: (element: INode) => void,
	) => {
		e.stopPropagation();
		callback(node.id);
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

	const renderAction = (action: any) => {
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
