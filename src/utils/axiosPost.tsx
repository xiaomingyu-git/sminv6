import type {AxiosError, AxiosResponse} from 'axios';
import axios from 'axios';
import {notification} from 'antd';

axios.defaults.adapter = require('axios/lib/adapters/http');

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const codeMessage: { [key: number]: string } = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	405: '请求方法不被允许。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};
// Add a response interceptor
axios.interceptors.response.use(
	(response: AxiosResponse) => response,
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	(error: AxiosError) => {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		const {response} = error;
		if (response) {
			// Request made and server responded
			const errorText =
				response.data.message ||
				codeMessage[response.status] ||
				response.statusText;
			notification.error({
				message: `请求错误 ${response.config.method} ${response.config.url}`,
				description: errorText,
			});
		} else if (error.request) {
			// Request made and server responded
			notification.error({
				description: '您的网络发生异常，无法连接服务器',
				message: '网络异常',
			});
		} else {
			// Something happened in setting up the request that triggered an Error
			notification.error({
				description: '应用代码问题',
				message: '配置错误',
			});
		}
		return error
	},
);