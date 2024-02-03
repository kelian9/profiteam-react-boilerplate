export interface ITableOptions {
	pagination?: {
		enabled: boolean;
		method?: (page: number) => void;
	};
	sort?: {
		enabled: boolean;
		method?: (sortData: any) => void;
	};
}
