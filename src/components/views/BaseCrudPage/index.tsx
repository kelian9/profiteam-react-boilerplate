import useModal from '@hooks/useModal';
import FormType from '@models/enums/FormTypesEnum';
import TableTypes from '@models/enums/TableTypeEnum';
import IErrorResponse from '@models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import React, { useMemo } from 'react';
import BFilter from '../../../components/ui/BFilter';
import BModal from '../../../components/ui/BModal';
import BTable from '../../../components/ui/BTable/BTable';
import BTableStore from '../../../components/ui/BTable/BTableStore';
import { IFormModal } from './models/IFormModal';
import IMethods from './models/IMethods';
import IQueryFilter from './models/IQueryFilter';
import { ISectionField } from './models/ISectionField';
import { ISectionFilter } from './models/ISectionFilter';
import { ISectionForm } from './models/ISectionForm';
import { ISectionTable } from './models/ISectionTable';
import styles from './style.module.scss';

interface BaseCrudPageProps<T> {
	methods: IMethods<T>;
	fields: ISectionField[];
	queryFilter?: IQueryFilter;
	filters?: ISectionFilter;
	table?: ISectionTable<T>;
	forms?: ISectionForm[];
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
				fields={table.fields}
				getData={methods?.filter}
				actions={table.actions}
				footFields={table.footFields}
				count={table.count}
				perPage={table.perPage}
				curPage={table.curPage}
				resetPagination={table.resetPagination}
				rowClick={table.rowClick}
				listOptions={table.listOptions}
				style={table.style}
				styleNode={table.styleNode}
			/>)
		} else {
			return <BTable
				fields={table.fields}
				getData={methods.filter as (...args: any[]) => Promise<T[] | AxiosResponse<T[] | IErrorResponse, any>>}
				footFields={table.footFields}
				actions={table.actions}
				perPage={table.perPage}
				rowClick={table.rowClick}
				listOptions={table.listOptions}
				style={table.style}
				styleNode={table.styleNode}
			/>
		}
	}, [table]);

	const renderButton = (type: FormType, button: any) => {
		if (!button?.template) {
			switch (type) {
				case FormType.ADD:
					return (
						<button
							key={'button' + type}
							className={styles['default-button']}
							onClick={toggleAddModal as () => void}
							{...button?.props}
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
							{...button?.props}
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
							{...button?.props}
						>
							Удалить
						</button>
					);
				default:
					break;
			}
		}
		return button?.template;
	};

	const renderModal = (type: FormType, modal: IFormModal) => {
		if (!modal?.required) return;
		if (!modal?.template) {
			switch (type) {
				case FormType.ADD:
					return (
						<BModal
							key={'modal' + type}
							show={isShowingAddModal as boolean}
							onCloseButtonClick={toggleAddModal as () => void}
							body={modal?.body}
							{...modal?.props}
						/>
					);
				case FormType.EDIT:
					return (
						<BModal
							key={'modal' + type}
							show={isShowingEditModal as boolean}
							onCloseButtonClick={toggleEditModal as () => void}
							body={modal?.body}
							{...modal?.props}
						/>
					);
				case FormType.DELETE:
					return (
						<BModal
							key={'modal' + type}
							show={isShowingDeleteModal as boolean}
							onCloseButtonClick={toggleDeleteModal as () => void}
							body={modal?.body}
							{...modal?.props}
						/>
					);
				default:
					break;
			}
		}
		return modal?.template;
	};

	return (
		<div style={style}>
			{filters &&
				<BFilter
					filterFields={filters.fields}
					onSave={filters.save}
				/>
			}
			{renderTable}
			<div className={styles['button-container']}>
				{forms?.map((form: ISectionForm) => renderButton(form.type, form.button))}
			</div>
			{forms?.map((form: ISectionForm) => renderModal(form.type, form.modal))}
		</div>
	);
};

export default BaseCrudPage;
