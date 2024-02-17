import testAPI from '@api/testAPI';
import IMethods from '@models/IMethods';
import IQueryFilter from '@models/IQueryFilter';
import EntityChangeFormType from '@models/enums/EntityChangeFormTypeEnum';
import FieldControlType from '@models/enums/FieldControlTypeEnum';
import PaginationParams from '@models/enums/PaginationParamsEnum';
import TableType from '@models/enums/TableTypeEnum';
import IEntity from './models/IEntity';
import { IEntityField } from './models/IEntityField';

const methods: IMethods<any> = {
	getData: (data: any) => testAPI.getData(data),
	// getById: (id: number) => console.log('by id - ', id),
	// create: (body) => console.log('create - ', body),
	// update: (id, body) => console.log('update - ', id, body),
	// delete: (id) => console.log('delete - ', id),
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

const fields: IEntityField = {
	title: {
		name: 'title',
		keyName: 'title',
	},
	id: {
		name: 'id',
		keyName: 'id',
	},
	userId: {
		name: 'id пользователя',
		keyName: 'userId',
	},
	completed: {
		name: 'completed',
		keyName: 'completed',
	},
};

const Test: IEntity<any> = {
	name: 'Test',
	methods,
	queryFilter,
	fields,
	filters: {
		filterFields: [],
		onSave: () => console.log('save'),
	},
	table: {
		type: TableType.LOCAL,
		tableFields: [
			{
				...fields.title,
				label: 'title',
			},
			{
				...fields.id,
				label: 'id',
			},
			{
				...fields.userId,
				label: 'userId',
			},
			{
				...fields.completed,
				label: 'completed',
			},
		],
	},
	forms: {
		[EntityChangeFormType.CREATE]: {
			formFields: [
				{
					...fields.id,
					controlType: FieldControlType.NUMBER,
				},
				{
					...fields.title,
					controlType: FieldControlType.STRING,
				},
				{
					...fields.userId,
					controlType: FieldControlType.NUMBER,
				},
				{
					...fields.completed,
					controlType: FieldControlType.STRING,
				},
			],
		},
		[EntityChangeFormType.UPDATE]: {
			formFields: [
				{
					...fields.id,
					controlType: FieldControlType.NUMBER,
				},
				{
					...fields.title,
					controlType: FieldControlType.STRING,
				},
				{
					...fields.userId,
					controlType: FieldControlType.NUMBER,
				},
				{
					...fields.completed,
					controlType: FieldControlType.DATE,
				},
			],
		},
		[EntityChangeFormType.DELETE]: {
			formFields: [
				{
					...fields.id,
					controlType: FieldControlType.NUMBER,
				},
				{
					...fields.title,
					controlType: FieldControlType.STRING,
				},
				{
					...fields.userId,
					controlType: FieldControlType.NUMBER,
				},
				{
					...fields.completed,
					controlType: FieldControlType.SELECTION,
				},
			],
		},
	},
};

export default Test;
