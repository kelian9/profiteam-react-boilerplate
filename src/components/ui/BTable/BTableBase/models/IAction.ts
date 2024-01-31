export interface IAction {
	method: (el?: any) => void;
	type: string;
	template?: JSX.Element;
}
