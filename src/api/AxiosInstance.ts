import axios from 'axios';

const api_endpoints = {
	dev: 'http://192.168.0.128:8001',
	test: 'http://192.168.0.64:8001',
	prod: 'http://192.168.0.64:8001',
};

const stand: string = process.env.APP_STAND || 'dev';
export const API_ENDPOINT_URL = (api_endpoints as any)[stand];

const AxiosInstance = axios.create({
	// baseURL: API_ENDPOINT_URL,
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default AxiosInstance;
