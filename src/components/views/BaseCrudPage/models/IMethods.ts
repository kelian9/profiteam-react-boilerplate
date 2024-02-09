import { AxiosResponse } from 'axios';
import IErrorResponse from '../../../../models/responses/IErrorResponse';

interface IMethods<T> {
	filter: ((...args: any[]) => Promise<AxiosResponse<T[] | IErrorResponse>>) | ((...args: any[]) => void);
	getById?: (id: number) => Promise<AxiosResponse<T | IErrorResponse>>;
	create?: (body: any) => Promise<AxiosResponse<boolean | IErrorResponse>>;
	update?: (id: number, body: any) => Promise<AxiosResponse<boolean | IErrorResponse>>;
	delete?: (id: number) => Promise<AxiosResponse<boolean | IErrorResponse>>;
}

export default IMethods;
