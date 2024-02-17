import useModal from '@hooks/useModal';
import { IEntityField } from '@models/IEntityField';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';
import TableTypes from '@models/enums/TableTypeEnum';
import IErrorResponse from '@models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import React, { useMemo } from 'react';
import BFilter from '../../../components/ui/BFilter';
import BModal from '../../../components/ui/BModal';
import BTable from '../../../components/ui/BTable/BTable';
import BTableStore from '../../../components/ui/BTable/BTableStore';
import IEntityFilter from '../../../entities/models/IEntityFilter';
import IEntityForm from '../../../entities/models/IEntityForm';
import { IEntityTable } from '../../../entities/models/IEntityTable';
import styles from './style.module.scss';

interface BaseCrudPageProps<T> {
	methods: IMethods<T>;
	fields: IEntityField[];
	queryFilter?: IQueryFilter;
	filters?: IEntityFilter;
	table?: IEntityTable<T>;
	forms?: IEntityForm[];
	style?: React.CSSProperties;
}

/* eslint-disable */
const BaseCrudPage = <T extends object>(props: BaseCrudPageProps<T>) => {
	const { methods, filters, table, forms, style } = props;

	const [isShowingAddModal, toggleAddModal] = useModal();
	const [isShowingEditModal, toggleEditModal] = useModal();
	const [isShowingDeleteModal, toggleDeleteModal] = useModal();

	const renderTable = useMemo(() => {
		if (!table) return null;
		if (table.type === TableTypes.GLOBAL) {
			return (
				<BTableStore
					data={table.data as T[]}
					fields={table.tableFields}
					getData={methods?.getData}
					actions={table.actions}
					footFields={table.footFields}
					count={table.count}
					limit={table.limit}
					curPage={table.curPage}
					resetPagination={table.resetPagination}
					rowClick={table.rowClick}
					listOptions={table.listOptions}
					style={table.style}
					nodeStyle={table.nodeStyle}
				/>
			);
		} else {
			return (
				<BTable
					fields={table.tableFields}
					getData={
						methods.getData as (...args: any[]) => Promise<T[] | AxiosResponse<T[] | IErrorResponse, any>>
					}
					footFields={table.footFields}
					actions={table.actions}
					limit={table.limit}
					rowClick={table.rowClick}
					listOptions={table.listOptions}
					style={table.style}
					nodeStyle={table.nodeStyle}
				/>
			);
		}
	}, [table]);

	const renderButton = (form: IEntityForm) => {
		switch (form.formType) {
			case EntityChangeFormType.CREATE:
				return (
					<>
						<button
							key={'button' + form.formType}
							className={styles['default-button']}
							onClick={toggleAddModal as () => void}
						>
							Добавить
						</button>
						<BModal
							key={'modal' + form.formType}
							show={isShowingAddModal as boolean}
							fields={form.formsFields}
							formType={form.formType}
							onCloseButtonClick={toggleAddModal as () => void}
							onSubmit={form.onSubmit}
						/>
					</>
				);
			case EntityChangeFormType.UPDATE:
				return (
					<>
						<button
							key={'button' + form.formType}
							className={styles['default-button']}
							onClick={toggleEditModal as () => void}
						>
							Редактировать
						</button>
						<BModal
							key={'modal' + form.formType}
							show={isShowingEditModal as boolean}
							formType={form.formType}
							fields={form.formsFields}
							onCloseButtonClick={toggleEditModal as () => void}
							onSubmit={form.onSubmit}
						/>
					</>
				);
			case EntityChangeFormType.DELETE:
				return (
					<>
						<button
							key={'button' + form.formType}
							className={styles['default-button']}
							onClick={toggleDeleteModal as () => void}
						>
							Удалить
						</button>
						<BModal
							key={'modal' + form.formType}
							show={isShowingDeleteModal as boolean}
							formType={form.formType}
							fields={form.formsFields}
							onCloseButtonClick={toggleDeleteModal as () => void}
							onSubmit={form.onSubmit}
						/>
					</>
				);
			default:
				break;
		}
	};

	return (
		<div style={style}>
			{filters && <BFilter filterFields={filters.filterFields} onSave={filters.onSave} />}
			{renderTable}
			<div className={styles['button-container']}>{forms?.map((form: IEntityForm) => renderButton(form))}</div>
		</div>
	);
};

export default BaseCrudPage;
