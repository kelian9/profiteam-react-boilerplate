import useModal from '@hooks/useModal';
import { IEntityField } from '@models/IEntityField';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import FormType from '@models/enums/FormTypesEnum';
import TableTypes from '@models/enums/TableTypeEnum';
import IErrorResponse from '@models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import React, { useMemo } from 'react';
import IEntityForm from 'src/entities/models/IEntityForm';
import BFilter from '../../../components/ui/BFilter';
import BModal from '../../../components/ui/BModal';
import BTable from '../../../components/ui/BTable/BTable';
import BTableStore from '../../../components/ui/BTable/BTableStore';
import { ISectionFilter } from './models/ISectionFilter';
import { ISectionTable } from './models/ISectionTable';
import styles from './style.module.scss';

interface BaseCrudPageProps<T> {
	methods: IMethods<T>;
	fields: IEntityField[];
	queryFilter?: IQueryFilter;
	filters?: ISectionFilter;
	table?: ISectionTable<T>;
	forms?: IEntityForm;
	style?: React.CSSProperties;
}
/* eslint-disable */
const BaseCrudPage = <T extends object>(props: BaseCrudPageProps<T>) => {
	const {
		methods,
		queryFilter,
		fields,
		filters,
		table,
		forms,
		style,
	} = props;

	const [isShowingAddModal, toggleAddModal] = useModal();
	const [isShowingEditModal, toggleEditModal] = useModal();
	const [isShowingDeleteModal, toggleDeleteModal] = useModal();

	const renderTable = useMemo(() => {
		if (!table) return null;
		if (table.type === TableTypes.GLOBAL) {
			return (<BTableStore
				data={table.data as T[]}
				fields={table.tableFields}
				getData={methods?.filter}
				actions={table.actions}
				footFields={table.footFields}
				count={table.count}
				limit={table.limit}
				curPage={table.curPage}
				resetPagination={table.resetPagination}
				rowClick={table.rowClick}
				listOptions={table.listOptions}
				style={table.style}
				styleNode={table.styleNode}
			/>)
		} else {
			return <BTable
				fields={table.tableFields}
				getData={methods.filter as (...args: any[]) => Promise<T[] | AxiosResponse<T[] | IErrorResponse, any>>}
				footFields={table.footFields}
				actions={table.actions}
				limit={table.limit}
				rowClick={table.rowClick}
				listOptions={table.listOptions}
				style={table.style}
				styleNode={table.styleNode}
			/>
		}
	}, [table]);

	const renderButton = (type: FormType) => {
		switch (type) {
			case FormType.ADD:
				return (
					<button
						key={'button' + type}
						className={styles['default-button']}
						onClick={toggleAddModal as () => void}
					>
						Добавить
					</button>
				);
			case FormType.EDIT:
				return (
					<button
						key={'button' + type}
						className={styles['default-button']}
						onClick={toggleEditModal as () => void}
					>
						Редактировать
					</button>
				);
			case FormType.DELETE:
				return (
					<button
						key={'button' + type}
						className={styles['default-button']}
						onClick={toggleDeleteModal as () => void}
					>
						Удалить
					</button>
				);
			default:
				break;
		}
	};

	const renderModal = (type: FormType) => {
		switch (type) {
			case FormType.ADD:
				return (
					<BModal
						key={'modal' + type}
						show={isShowingAddModal as boolean}
						onCloseButtonClick={toggleAddModal as () => void}
					/>
				);
			case FormType.EDIT:
				return (
					<BModal
						key={'modal' + type}
						show={isShowingEditModal as boolean}
						onCloseButtonClick={toggleEditModal as () => void}
					/>
				);
			case FormType.DELETE:
				return (
					<BModal
						key={'modal' + type}
						show={isShowingDeleteModal as boolean}
						onCloseButtonClick={toggleDeleteModal as () => void}
					/>
				);
			default:
				break;
		}
	};

	return (
		<div style={style}>
			{filters &&
				<BFilter
					filterFields={filters.filterFields}
					onSave={filters.onSave}
				/>
			}
			{renderTable}
			<div className={styles['button-container']}>
				{forms?.formsFields?.map((form) => renderButton(form.type))}
			</div>
			{forms?.formsFields?.map((form) => renderModal(form.type))}
		</div>
	);
};

export default BaseCrudPage;
