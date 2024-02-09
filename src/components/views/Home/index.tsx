import FormType from '@models/enums/FormTypesEnum';
import TableActionType from '@models/enums/TableActionTypesEnum';
import TableTypes from '@models/enums/TableTypeEnum';
import { changePage } from '@slices/testSlice';
import testActions from '@store/actions/testActions';
import { AppDispatch } from '@store/store';
import BaseCrudPage from '@views/BaseCrudPage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home: React.FC = () => {
	const fields = [
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

	const dispatch = useDispatch<AppDispatch>();
	const tableState = useSelector((state: any) => state.test);

	const changeCurPage = (page: number) => {
		dispatch(changePage({ page }));
		dispatch(testActions.getData());
	};

	const tableParams = {
		pagination: {
			enabled: true,
			method: (page: number) => changeCurPage(page),
		},
		sort: {
			enabled: false,
		},
	};

	const methods = {
		filter: () => dispatch(testActions.getData()),
	};

	const table = {
		type: TableTypes.GLOBAL,
		fields: fields,
		data: tableState.data,
		actions: actionsTest,
		curPage: tableState.curPage,
		count: tableState.count,
		listOptions: tableParams,
	};

	const queryFilter = {
		name: 'test',
		type: 'test',
		defaultValue: 1,
		required: true,
	};

	const filters = {
		fields: fields,
		save: () => console.log('saveFilter'),
	};

	const forms = [
		{
			type: FormType.ADD,
			modal: {
				required: true,
				body: (
					<form style={{ display: 'flex', flexDirection: 'column' }}>
						<input></input>
						<select></select>
						<button>Сохранить</button>
					</form>
				),
			},
		},
		{
			type: FormType.EDIT,
			button: {
				props: {
					disabled: true,
				},
			},
			modal: {
				required: true,
				body: 'Редактировать',
			},
		},
		{
			type: FormType.DELETE,
			modal: {
				required: true,
				body: 'Удалить',
			},
		},
		{
			type: FormType.CUSTOM,
			button: {
				template: <button key='123123' style={{ width: 120, backgroundColor: 'red', marginLeft: 15 }}></button>,
			},
			body: 'Новенькое',
		},
	];

	const style = {};

	return (
		<>
			Home Page
			<BaseCrudPage
				methods={methods}
				fields={fields}
				queryFilter={queryFilter}
				filters={filters}
				table={table}
				forms={forms}
				style={style}
			/>
		</>
	);
};

export default Home;
