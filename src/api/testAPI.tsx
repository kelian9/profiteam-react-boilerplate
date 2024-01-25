import AxiosInstance from './AxiosInstance';

class testAPI {
	public static getData(params: any) {
		return AxiosInstance.get('posts', {
			params: params,
		});
	}
}

export default testAPI;
