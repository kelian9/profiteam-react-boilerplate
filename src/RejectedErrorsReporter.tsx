import { SerializedError } from '@reduxjs/toolkit';
import { removeFromQueue } from '@slices/rejectedErrorsQueue';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

const RejectedErrorsReporter = () => {
	const queue = useAppSelector<SerializedError[]>((state) => state.rejectedErrorsQueue);
	const dispatch = useAppDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		if (!queue.length) {
			return;
		}
		dispatch(removeFromQueue(queue));
		queue.forEach((item) => {
			const key = enqueueSnackbar(item.message, {
				variant: 'error',
				action: <button onClick={() => closeSnackbar(key)}>Dismiss</button>,
			});
		});
	}, [dispatch, enqueueSnackbar, closeSnackbar, queue]);
	return null;
};

export default RejectedErrorsReporter;
