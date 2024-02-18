import BTableActionType from '@models/enums/BTableActionTypesEnum';

export interface IAction {
	method: ((...args: any) => void) | boolean;
	type: BTableActionType;
	template?: JSX.Element;
}
