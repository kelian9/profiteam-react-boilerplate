export interface IAction<T> {
	method: (element?: T) => void;
	type: string;
	template?: JSX.Element;
}
