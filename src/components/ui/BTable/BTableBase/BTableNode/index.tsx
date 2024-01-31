import React from 'react';
import deleteIcon from '../../../../../assets/images/icons/delete-icon.svg';
import editIcon from '../../../../../assets/images/icons/edit-icon.svg';
import saveIcon from '../../../../../assets/images/icons/save-icon.svg';
import BSelect from '../../../../../components/ui/BSelect';
import IBTableNodeProps from '../models/IBTableNode';
import styles from './style.module.scss';

/* eslint-disable */
const BTableNode = (props: IBTableNodeProps) => {
	const {
		node,
		fields,
		actions,
		rowClick,
		styleNode,
	} = props;

	const handlerRowClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
		e.stopPropagation();
		if (rowClick) rowClick(node.id);
	};

	const handlerActionClick = (e: React.MouseEvent<HTMLImageElement | HTMLSpanElement, MouseEvent>, cb: any) => {
		e.stopPropagation();
		cb(node.id);
	}

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
					return <img
						src={saveIcon}
						alt='save'
						onClick={(e) => handlerActionClick(e, action.method)}
						className={styles['node-actions-icon']}
					/>
				case 'edit':
					return <img
						src={editIcon}
						alt='edit'
						onClick={(e) => handlerActionClick(e, action.method)}
						className={styles['node-actions-icon']}
					/>
				case 'delete':
					return <img
						src={deleteIcon}
						alt='delete'
						onClick={(e) => handlerActionClick(e, action.method)}
						className={styles['node-actions-icon']}
					/>
				default:
					return <span onClick={(e) => handlerActionClick(e, action.method)}>{action.type}</span>
			}
		}
		return action?.template;
	};

	return (
		<tr style={styleNode} onClick={(e) => handlerRowClick(e)}>
			{fields?.map((field, index) => <td key={index}>{renderField(field)}</td>)}
			{actions?.length &&
				<td>
					<div className={styles['node-actions']}>
						{actions.map(item => renderAction(item))}
					</div>
				</td>
			}
		</tr>
	);
};

export default BTableNode;
