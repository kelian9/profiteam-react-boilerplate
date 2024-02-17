import testAPI from '@api/testAPI';
import { IEntityField } from '@models/IEntityField';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import BTableActionType from '@models/enums/BTableActionTypesEnum';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';
import FieldControlType from '@models/enums/FieldControlTypeEnum';
import PaginationParams from '@models/enums/PaginationParamsEnum';
import TableTypes from '@models/enums/TableTypeEnum';
import IEntity from './models/IEntity';
import IEntityFilter from './models/IEntityFilter';
import IEntityForm from './models/IEntityForm';
import { IEntityTable } from './models/IEntityTable';

const methods: IMethods<any> = {
	getData: (data: any) => testAPI.getData(data),
};

const queryFilter: IQueryFilter = {
	parameters: [
		{
			name: 'offset',
			type: PaginationParams.OFFSET,
			defaultValue: 0,
			required: true,
		},
		{
			name: 'limit',
			type: PaginationParams.LIMIT,
			defaultValue: 10,
			required: true,
		},
		{
			name: 'sortBy',
			type: PaginationParams.SORT_BY,
			defaultValue: 'date_created',
		},
		{
			name: 'sorting',
			type: PaginationParams.SORT_ORDER,
			defaultValue: 'desc',
		},
	],
};

const fields: IEntityField[] = [
	{
		name: 'Осн текст',
	},
	{
		name: 'id',
	},
	{
		name: 'id пользователя',
	},
	{
		name: 'completed',
	},
];

const filters: IEntityFilter = {
	filterFields: [],
	onSave: () => console.log('saveFilter'),
};

const actionsTest = [
	{
		type: BTableActionType.SAVE,
		method: () => console.log('save'),
	},
	{
		type: BTableActionType.EDIT,
		method: () => console.log('edit'),
	},
	{
		type: BTableActionType.DELETE,
		method: () => console.log('delete'),
	},
];

const tableFields = [
	{
		key: 'title',
		label: 'Осн текст',
	},
	{
		key: 'id',
		label: 'id',
	},
	{
		key: 'userId',
		label: 'id пользователя',
	},
	{
		key: 'completed',
		label: 'completed',
	},
];

const listOptionsTest = {
	pagination: {
		enabled: true,
	},
	sort: {
		enabled: false,
	},
};

const table: IEntityTable<any> = {
	type: TableTypes.LOCAL,
	tableFields: tableFields,
	actions: actionsTest,
	listOptions: listOptionsTest,
};

const forms: IEntityForm[] = [
	{
		formType: EntityChangeFormType.CREATE,
		onSubmit: (e: any) => console.log(e),
		formsFields: [
			{
				name: 'Добавить',
				controlType: FieldControlType.STRING,
			},
			{
				name: 'Тип',
				controlType: FieldControlType.SELECTION,
			},
			{
				name: 'Число',
				controlType: FieldControlType.NUMBER,
			},
			{
				name: 'Удалить',
				controlType: FieldControlType.STRING,
			},
		],
	},
	{
		formType: EntityChangeFormType.UPDATE,
		onSubmit: (e: any) => console.log(e),
		formsFields: [
			{
				name: 'Редактировать',
				controlType: FieldControlType.STRING,
			},
			{
				name: 'Удалить',
				controlType: FieldControlType.STRING,
			},
		],
	},
];

const Test: IEntity<any> = {
	name: 'Test',
	methods,
	queryFilter,
	fields,
	filters,
	table,
	forms,
};

export default Test;
