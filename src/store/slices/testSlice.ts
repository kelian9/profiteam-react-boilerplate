import { createSlice } from '@reduxjs/toolkit';
import testActions from '@store/actions/testActions';

export interface testState {
	isLoading: boolean;
	count: number;
	_page: number;
	_limit: number;
	data: any[];
}

const initialState: testState = {
	isLoading: false,
	count: 10,
	_page: 1,
	_limit: 10,
	data: [],
};

const name = 'test';
const testSlice = createSlice({
	name,
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Getting List
		builder.addCase(testActions.getData.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(testActions.getData.fulfilled, (state, action) => {
			if ('message' in action.payload) {
				state.isLoading = false;
				return;
			}
			state.data = action.payload;
			state.data = [...action.payload];
			state.isLoading = false;
		});
		builder.addCase(testActions.getData.rejected, (state) => {
			state.isLoading = false;
		});

		// changePage
		builder.addCase(testActions.changePage.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(testActions.changePage.fulfilled, (state, action) => {
			console.log('changePAGE GLOBAL - ', action.payload);
			state._page = action.payload;
		});
		builder.addCase(testActions.changePage.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export default testSlice.reducer;
