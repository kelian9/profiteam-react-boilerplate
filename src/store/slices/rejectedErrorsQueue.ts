import { SerializedError } from '@reduxjs/toolkit';

const REMOVE_FROM_QUEUE = 'rejectedErrorsQueue/remove';
const ADD_TO_QUEUE = 'rejectedErrorsQueue/add';

const initialState = [] as SerializedError[];

const reducer = (state = initialState, action: any) => {
	if (action.type && action.type.endsWith('/rejected') && action.error) {
		return [...state, action.error as SerializedError];
	}
	if (action.type === REMOVE_FROM_QUEUE) {
		const items = action.payload;
		return state.filter((x) => !items.includes(x));
	}
	if (action.type === ADD_TO_QUEUE) {
		return [...state, action.payload];
	}
	return state;
};

export const removeFromQueue = (items: SerializedError[]) => ({ type: REMOVE_FROM_QUEUE, payload: items });

export const addToQueue = (item: SerializedError) => ({ type: ADD_TO_QUEUE, payload: item });

export default reducer;
