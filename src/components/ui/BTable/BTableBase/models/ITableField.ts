export interface ITableField {
	key: string;
	label: string;
	sortable?: boolean;
	type?: string;
	props?: any;
	template?: JSX.Element;
}

export interface ITableFooterField {
	key: string;
	label?: string;
}
