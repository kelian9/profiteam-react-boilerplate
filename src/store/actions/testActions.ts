import testAPI from '@api/testAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';

const testActions = {
	getData: createAsyncThunk(`${name}/getData`, async (data: any) => {
		console.log('createAsyncThunk - ', data);
		const response = await testAPI.getData(data);

		return [...response.data];
	}),
	changePage: createAsyncThunk(`${name}/changePage`, (page: number) => {
		return page;
	}),
	// const changePage = createAction('changePage');
};

export default testActions;
