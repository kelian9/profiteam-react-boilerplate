import testAPI from '@api/testAPI';
import { IEntityField } from '@models/IEntityField';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import FormType from '@models/enums/FormTypesEnum';
import TableActionType from '@models/enums/TableActionTypesEnum';
import TableTypes from '@models/enums/TableTypeEnum';
import IEntityFilter from './models/IEntityFilter';
import IEntityForm from './models/IEntityForm';
import { IEntityTable } from './models/IEntityTable';

const methods: IMethods<any> = {
	filter: (data: any) => testAPI.getData(data),
};

const queryFilter: IQueryFilter = {
	name: 'test',
	type: 'test',
	defaultValue: 1,
	required: true,
};

const fields: IEntityField[] = [
	{
		name: 'Осн текст',
		entityName: 'test',
	},
	{
		name: 'id',
		entityName: 'test',
	},
	{
		name: 'id пользователя',
		entityName: 'test',
	},
	{
		name: 'completed',
		entityName: 'test',
	},
];

const filters: IEntityFilter = {
	filterFields: [],
	onSave: () => console.log('saveFilter'),
};

const actionsTest = [
	{
		type: TableActionType.SAVE,
		method: () => console.log('save'),
	},
	{
		type: TableActionType.EDIT,
		method: () => console.log('edit'),
	},
	{
		type: TableActionType.DELETE,
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
	limit: 10,
	listOptions: listOptionsTest,
};

const forms: IEntityForm = {
	formsFields: [
		{
			type: FormType.ADD,
			name: 'Добавить',
		},
		{
			type: FormType.EDIT,
			name: 'Редактировать',
		},
		{
			type: FormType.DELETE,
			name: 'Удалить',
		},
	],
};

export default {
	name: 'Test',
	methods,
	queryFilter,
	fields,
	filters,
	table,
	forms,
};
