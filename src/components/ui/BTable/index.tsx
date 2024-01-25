import React, { useEffect, useState } from 'react';
import chevronDownIcon from '../../../assets/images/icons/chevron-down-icon.svg';
import chevronUpIcon from '../../../assets/images/icons/chevron-up-icon.svg';
import BPagination from '../BPagination';
import BTableNode from './BTableNode';
import styles from './style.module.scss';

interface IBTableProps {
	data: any[];
	fields: any[];
	footFields?: any[];
	actions?: { save?: (el?: any) => void; edit?: (el?: any) => void; delete?: (el?: any) => void };
	count?: number;
	perPage?: number;
	curPage?: number;
	getData?: (data?: any) => void;
	changePage?: (page: number) => void;
	resetPagination?: () => void;
	sortTable?: (sortBy: string, sortDesc: boolean) => void;
	rowClick?: (row?: any) => void;
	fieldClick?: (field?: any) => void;
	tableParams?: { pagination: Boolean; sort: Boolean };
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

/* eslint-disable */
const BTable = (props: IBTableProps) => {
	const {
		data,
		fields,
		footFields,
		actions,
		count,
		perPage,
		curPage,
		getData,
		changePage,
		resetPagination,
		sortTable,
		rowClick,
		fieldClick,
		tableParams,
		style,
		styleNode,
	} = props;

	const [sortBy, setSortBy] = useState<string>('date_created');
	const [sortDesc, setSortDesc] = useState<boolean>(false);

	const pagination = (page: number) => {
		if (!tableParams?.pagination) return;
		if (!changePage) return;
		changePage(page);
	};

	const sorting = (key: string) => {
		if (!tableParams?.sort) return;
		if (fields.filter(item => item.sortable === true).findIndex(item => item.key === key) === -1) return;
		if (sortBy === key) {
			setSortDesc(!sortDesc);
			return;
		};
		setSortBy(key);
		setSortDesc(false);
	};

	// useEffect(() => {
	// 	if (!sortBy) return;
	// 	if (!sortTable) return;
	// 	sortTable(sortBy, sortDesc);
	// }, [sortBy]);

	// useEffect(() => {
	// sortTable(sortBy, sortDesc);
	// }, [sortDesc]);

	useEffect(() => {
		// if (!resetPagination) return;
		if (!getData) return;
		// resetPagination();
		getData();
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
									{field.key === sortBy
										&& <img
											src={sortDesc ? chevronUpIcon : chevronDownIcon}
											alt=''
											onClick={() => sorting(field.key)}
										/>
									}
								</div>
							</th>
						))}
						{actions && <th>Действия</th>}
					</tr>
				</thead>
				<tbody>
					{data?.map((item, index) => (
						<BTableNode
							node={item}
							fields={fields}
							actions={actions}
							rowClick={rowClick}
							fieldClick={fieldClick}
							styleNode={styleNode}
							key={index}
						/>
					))}
				</tbody>
				<tfoot>
					<tr>
						{footFields?.map((item, index) => <td key={index}>{item}</td>)}
					</tr>
				</tfoot>
			</table>
			{
				tableParams?.pagination &&
				<BPagination
					disabled={false}
					pageCount={count ? count : 1}
					currentPage={curPage}
					bigStep
					handlePageChange={pagination}
				/>
			}
		</>
	);
};

export default BTable;
