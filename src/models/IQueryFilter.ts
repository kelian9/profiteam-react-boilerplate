import PaginationParams from './enums/PaginationParamsEnum';

interface IQueryFilter {
	parameters: {
		name: string;
		type: PaginationParams;
		defaultValue?: string | number;
		required?: boolean;
	}[];
}

export default IQueryFilter;
