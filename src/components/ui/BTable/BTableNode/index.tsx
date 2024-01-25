import React from 'react';
import deleteIcon from '../../../../assets/images/icons/delete-icon.svg';
import editIcon from '../../../../assets/images/icons/edit-icon.svg';
import saveIcon from '../../../../assets/images/icons/save-icon.svg';
import styles from './style.module.scss';

/* eslint-disable */
interface IBTableNodeProps {
	node: any;
	fields: any[];
	actions?: { save?: (el?: any) => void, edit?: (el?: any) => void, delete?: (el?: any) => void };
	// nestingLevel?: V;
	rowClick?: (row?: any) => void;
	fieldClick?: (field?: any) => void;
	styleNode?: React.CSSProperties;
}
/* eslint-disable */
const BTableNode = (props: IBTableNodeProps) => {
	const {
		node,
		fields,
		actions,
		// nestingLevel,
		rowClick,
		fieldClick,
		styleNode,
	} = props;

	const renderField = (field: any) => {
		switch (field.type) {
			case 'select':
				return <select></select>;
			case 'input':
				return <input value={node[field.key]}></input>;
			default:
				return <span className={styles.field}>{node[field.key]}</span>;
		}
	};

	return (
		<tr style={styleNode}>
			{fields?.map((field, index) => (
				<td key={index}>{renderField(field)}</td>
			))}
			{actions
				&& <td>
					<div className={styles['node-actions']}>
						{actions.save &&
							<img src={saveIcon} alt='save' onClick={actions.save} className={styles['node-actions-icon']} />
						}
						{actions.edit &&
							<img src={editIcon} alt='edit' onClick={actions.edit} className={styles['node-actions-icon']} />
						}
						{actions.delete &&
							<img src={deleteIcon} alt='delete' onClick={actions.delete} className={styles['node-actions-icon']} />
						}
					</div>
				</td>
			}
		</tr>
	);
};

export default BTableNode;
