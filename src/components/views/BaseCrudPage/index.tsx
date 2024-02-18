import useModal from '@hooks/useModal';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import BTableActionType from '@models/enums/BTableActionTypesEnum';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';
import PaginationParams from '@models/enums/PaginationParamsEnum';
import IErrorResponse from '@models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import React, { useMemo, useState } from 'react';
import { IEntityField } from 'src/entities/models/IEntityField';
import BFilter from '../../../components/ui/BFilter';
import BTable from '../../../components/ui/BTable/BTable';
import IEntityFilter from '../../../entities/models/IEntityFilter';
import IEntityForm from '../../../entities/models/IEntityForm';
import { IEntityTable } from '../../../entities/models/IEntityTable';
import BFormModal from './BFormModal';
import styles from './style.module.scss';

interface BaseCrudPageProps<T> {
	methods: IMethods<T>;
	fields: IEntityField;
	queryFilter?: IQueryFilter;
	filters?: IEntityFilter;
	table?: IEntityTable;
	forms?: IEntityForm;
	style?: React.CSSProperties;
}

const BaseCrudPage = <T extends object>(props: BaseCrudPageProps<T>) => {
	const { methods, queryFilter, filters, table, forms, style } = props;

	const [isShowingModal, toggleModal] = useModal();

	const [formType, setFormType] = useState(EntityChangeFormType.CREATE);

	const handleModal = (e: any, newFormType: EntityChangeFormType) => {
		setFormType(newFormType);
		if (typeof toggleModal === 'function') toggleModal();
	};

	const actions = useMemo(() => {
		const result = [];
		if (methods.update) {
			result.push({
				type: BTableActionType.EDIT,
				method: (e: any) => handleModal(e, EntityChangeFormType.UPDATE),
			});
		}
		if (methods.delete) {
			result.push({
				type: BTableActionType.DELETE,
				method: (e: any) => handleModal(e, EntityChangeFormType.DELETE),
			});
		}
		if (table?.actions) {
			table.actions.map((item) => result.push(item));
		}
		return result;
	}, [methods]);

	const listOptions = useMemo(() => {
		if (!queryFilter || !queryFilter.parameters.length) return;
		const result = {
			pagination: {
				enabled: false,
			},
			sort: {
				enabled: false,
			},
		};
		if (queryFilter.parameters.findIndex((item) => item.type === PaginationParams.OFFSET) !== -1) {
			result.pagination.enabled = true;
		}
		if (queryFilter.parameters.findIndex((item) => item.type === PaginationParams.SORT_BY) !== -1) {
			result.sort.enabled = true;
		}
		return result;
	}, [queryFilter?.parameters]);

	const submit = (id: number, body?: any) => {
		if (formType === EntityChangeFormType.CREATE) {
			if (!methods || !methods.create) return;
			methods.create(body);
		}
		if (formType === EntityChangeFormType.UPDATE) {
			if (!methods || !methods.update) return;
			methods.update(id, body);
		}
		if (formType === EntityChangeFormType.DELETE) {
			if (!methods || !methods.delete) return;
			methods.delete(id);
		}
	};

	const renderTable = useMemo(() => {
		if (!table) return null;
		// if (table.type === TableType.GLOBAL) {
		// 	return (
		// 		<BTableStore
		// 			data={table.data as T[]}
		// 			fields={table.tableFields}
		// 			getData={methods?.getData}
		// 			actions={table.actions}
		// 			footFields={table.footFields}
		// 			count={table.count}
		// 			limit={table.limit}
		// 			curPage={table.curPage}
		// 			resetPagination={table.resetPagination}
		// 			rowClick={table.rowClick}
		// 			listOptions={table.listOptions}
		// 			style={table.style}
		// 			nodeStyle={table.nodeStyle}
		// 		/>
		// 	);
		// } else {}
		return (
			<BTable
				fields={table.tableFields}
				getData={methods.getData as (...args: any[]) => Promise<T[] | AxiosResponse<T[] | IErrorResponse, any>>}
				actions={actions}
				listOptions={listOptions}
				footFields={table.footFields ? table.footFields : []}
				limit={table.limit ? table.limit : 20}
				rowClick={table.rowClick ? table.rowClick : null}
				style={table.style ? table.style : {}}
				nodeStyle={table.nodeStyle ? table.nodeStyle : {}}
			/>
		);
	}, [table]);

	return (
		<>
			<div style={style}>
				{filters && <BFilter filterFields={filters.filterFields} onSave={filters.onSave} />}
				{renderTable}
				{methods.create && (
					<div className={styles['button-container']}>
						<button onClick={(e) => handleModal(e, EntityChangeFormType.CREATE)}>Добавить</button>
					</div>
				)}
			</div>
			{forms && (
				<BFormModal
					show={isShowingModal as boolean}
					closeModal={toggleModal as () => void}
					getById={methods.getById}
					formType={formType}
					formFields={forms[formType].formFields}
					onSubmit={submit}
				/>
			)}
		</>
	);
};

export default BaseCrudPage;
