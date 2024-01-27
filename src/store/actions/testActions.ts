import testAPI from '@api/testAPI';
import { createAsyncThunk } from '@reduxjs/toolkit';

/* eslint-disable */
const testActions = {
	getData: createAsyncThunk('test/getData', async (_, { getState }) => {
		const test = getState().test;
		const data = {
			_page: test._page,
			_limit: test._limit,
		};
		const response = await testAPI.getData(data);

		return response.data;
	}),
};

export default testActions;
