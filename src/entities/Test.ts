import testActions from '@store/actions/testActions';
import { AppDispatch } from '@store/store';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch<AppDispatch>();

const methods: any = {
	filter: () => dispatch(testActions.getData()),
};

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

const filterFields = [{}];

const formFields = [{}];

export default {
	name: 'Test',
	methods,
	fields,
	filterFields,
	formFields,
};
