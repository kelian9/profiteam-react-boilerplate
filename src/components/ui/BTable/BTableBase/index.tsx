import React, { useEffect, useState } from 'react';
import chevronDownIcon from '../../../../assets/images/icons/chevron-down-icon.svg';
import chevronUpIcon from '../../../../assets/images/icons/chevron-up-icon.svg';
import BPagination from '../../BPagination';
import BTableNode from './BTableNode';
import IBTableBaseProps from './models/IBTableBase';
import styles from './style.module.scss';

const BTableBase = <T extends object>(props: IBTableBaseProps<T>) => {
	const {
		data,
		fields,
		footFields,
		actions,
		count,
		curPage,
		getData,
		resetPagination,
		rowClick,
		listOptions,
		style,
		styleNode,
	} = props;

	const [sortBy, setSortBy] = useState<string>('');
	const [sortDesc, setSortDesc] = useState<boolean>(false);

	const pagination = (page: number) => {
		if (!listOptions?.pagination?.enabled) return;
		if (listOptions.pagination.method) listOptions.pagination.method(page);
	};

	const sorting = (key: string) => {
		if (!listOptions?.sort?.enabled) return;
		if (fields.filter((item) => item.sortable === true).findIndex((item) => item.key === key) === -1) return;
		if (sortBy === key) {
			setSortDesc(!sortDesc);
			return;
		}
		setSortBy(key);
		setSortDesc(false);
	};

	useEffect(() => {
		if (!sortDesc) return;
		if (listOptions?.sort?.method) listOptions.sort.method({ sortBy, sortDesc });
	}, [sortBy]);

	useEffect(() => {
		if (listOptions?.sort?.method) listOptions.sort.method({ sortBy, sortDesc });
	}, [sortDesc]);

	useEffect(() => {
		if (resetPagination) resetPagination();
		if (getData) getData();
	}, []);

	return (
		<>
			<table className={styles.defaultTable} style={style}>
				<thead>
					<tr>
						{fields?.map((field, index) => (
							<th key={index} onClick={() => sorting(field.key)}>
								<div className={styles.fieldHead}>
									<span>{field.label}</span>
									{field.key === sortBy && (
										<img
											src={sortDesc ? chevronUpIcon : chevronDownIcon}
											alt=''
											onClick={() => sorting(field.key)}
										/>
									)}
								</div>
							</th>
						))}
						{actions && <th>Действия</th>}
					</tr>
				</thead>
				<tbody>
					{data?.map((item, index) => (
						<BTableNode<T>
							key={index}
							node={item}
							fields={fields}
							actions={actions}
							rowClick={rowClick}
							styleNode={styleNode}
						/>
					))}
				</tbody>
				<tfoot>
					<tr>{footFields?.map((item, index) => <td key={index}>{item?.label}</td>)}</tr>
				</tfoot>
			</table>
			{listOptions?.pagination?.enabled && curPage && (
				<BPagination
					bigStep
					disabled={false}
					pageCount={count ? count : 1}
					currentPage={curPage}
					handlePageChange={pagination}
				/>
			)}
		</>
	);
};

export default BTableBase;
