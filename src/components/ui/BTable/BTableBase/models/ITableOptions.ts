export interface ITableOptions {
	pagination?: {
		enabled: boolean;
		method?: (page: number) => void;
	};
	sort?: {
		enabled: boolean;
		// Продумать, что мб в sortData
		method?: (sortData: any) => void;
	};
}
