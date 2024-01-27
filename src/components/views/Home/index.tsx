import { changePage } from '@slices/testSlice';
import testActions from '@store/actions/testActions';
import { AppDispatch } from '@store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BTableGlobalState from '../../../components/ui/BTableGlobalState';

const Home: React.FC = () => {
	const fieldsTest = [
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
			key: 'body',
			label: 'Инфо',
		},
	];
	const actionsTest = {
		delete() {
			console.log('delete');
		},
		edit() {
			console.log('edit');
		},
		save() {
			console.log('save');
		},
	};
	const tableParams = {
		pagination: true,
		sort: false,
	};

	const dispatch = useDispatch<AppDispatch>();
	const tableState = useSelector((state: any) => state.test);

	const changeCurPage = (page: number) => {
		dispatch(changePage({ page }));
		dispatch(testActions.getData());
	};

	return (
		<>
			Home Page
			{/* <BTableLocalState
				// data={dataTest}
				fields={fieldsTest}
				actions={actionsTest}
				tableParams={tableParams}
				getData={testAPI.getData}
			/> */}
			<BTableGlobalState
				data={tableState.data}
				curPage={tableState._page}
				getData={() => dispatch(testActions.getData())}
				changePage={changeCurPage}
				count={tableState.count}
				fields={fieldsTest}
				actions={actionsTest}
				tableParams={tableParams}
			/>
		</>
	);
};

export default Home;
