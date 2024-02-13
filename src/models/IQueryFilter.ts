interface IQueryFilter {
	name: string;
	type: string;
	defaultValue?: string | number;
	required?: boolean;
}

export default IQueryFilter;
