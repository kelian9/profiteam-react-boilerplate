export interface IAction {
	method: (element?: any) => void;
	type: string;
	template?: JSX.Element;
}
