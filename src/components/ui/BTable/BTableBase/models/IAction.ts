import BTableActionType from '@models/enums/BTableActionTypesEnum';

export interface IAction<T> {
	method: (element?: T) => void;
	type: BTableActionType;
	template?: JSX.Element;
}
