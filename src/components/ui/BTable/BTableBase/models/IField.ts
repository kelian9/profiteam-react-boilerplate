export interface IField {
	key: string;
	label: string;
	sortable?: boolean;
	type?: string;
	props?: any;
	template?: JSX.Element;
}

export interface IFootField {
	key: string;
	label?: string;
}
