import TableActionType from '@models/enums/TableActionTypesEnum';

export interface IAction<T> {
	method: (element?: T) => void;
	type: TableActionType;
	template?: JSX.Element;
}
