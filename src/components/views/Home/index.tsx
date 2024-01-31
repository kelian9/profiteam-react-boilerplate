import testAPI from '@api/testAPI';
import { changePage } from '@slices/testSlice';
import testActions from '@store/actions/testActions';
import { AppDispatch } from '@store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BTable from '../../../components/ui/BTable/BTable';

const Home: React.FC = () => {
	const fieldsTest = [
		{
			key: 'title',
			label: 'Осн текст',
			sortable: true,
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
			key: 'body',
			label: 'Инфо',
		},
		{
			key: 'userId',
			label: 'Инфо',
			type: 'input',
		},
		{
			key: 'userId',
			label: 'Инфо',
			type: 'custom',
			template: <input style={{ backgroundColor: 'red' }} />,
		},
	];
	/* eslint-disable */
	const actionsTest = [
		{
			method: () => console.log('save'),
			type: 'save',
			template: <img onClick={() => console.log('save')} src='' alt='ПОЫТЫЫ' />,
		},
		{
			method: () => console.log('edit'),
			type: 'edit',
		},
		{
			method: () => console.log('delete'),
			type: 'delete',
		},
	];

	const dispatch = useDispatch<AppDispatch>();
	const tableState = useSelector((state: any) => state.test);

	const changeCurPage = (page: number) => {
		dispatch(changePage({ page }));
		dispatch(testActions.getData());
	};

	const tableOptions = {
		pagination: {
			enabled: true,
			method: changeCurPage,
		},
		sort: {
			enabled: false,
		},
	};

	return (
		<>
			Home Page
			<BTable
				fields={fieldsTest}
				actions={actionsTest}
				tableOptions={tableOptions}
				getData={testAPI.getData}
			/>
			{/* <BTableStore
				data={tableState.data}
				curPage={tableState._page}
				getData={() => dispatch(testActions.getData())}
				count={tableState.count}
				fields={fieldsTest}
				actions={actionsTest}
				tableOptions={tableOptions}
			/> */}
		</>
	);
};

export default Home;
