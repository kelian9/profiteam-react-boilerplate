import AxiosInstance from './AxiosInstance';

class testAPI {
	public static getData(params: any) {
		return AxiosInstance.get('todos', {
			params,
		});
	}
}

export default testAPI;
