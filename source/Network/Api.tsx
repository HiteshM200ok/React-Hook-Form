import Axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig as ARequestConfig,
} from 'axios';
import {getAppConfig} from '@appconfig-root';

export interface AxiosRequestConfig extends ARequestConfig {
  isDataStringify?: boolean;
  signal?: any;
}

type TApiMethodParams = [
  url: string,
  data: object,
  config?: AxiosRequestConfig,
];

const singletonEnforcer = Symbol();

class ApiService {
  static ref: ApiService;
  private axiosClient: AxiosInstance;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot create Axios singleton instance');
    }

    this.axiosClient = Axios.create({
      baseURL: getAppConfig().apiBaseUrl,
      timeoutErrorMessage: 'Network timeout',
    });

    this.addRequestInterceptors();
    this.addResponseInterceptors();
  }

  static get instance() {
    if (!this.ref) {
      this.ref = new ApiService(singletonEnforcer);
    }
    return this.ref;
  }

  configHeaders = (config: AxiosRequestConfig) => {
    //check if key exists
    if (config.hasOwnProperty('isDataStringify')) {
      delete config.isDataStringify;
    }
    return config.headers;
  };

  // Add a request interceptor
  addRequestInterceptors = () => {
    this.axiosClient.interceptors.request.use(
      (config: any) => {
        const newConfig = {
          ...config,
          headers: {
            ...this.axiosClient.defaults.headers.common,
            'Content-Type': 'application/x-www-form-urlencoded',
            ...this.configHeaders(config),
          },
        };
        return newConfig;
      },
      error => {
        // Do something with request error
        return Promise.reject(error);
      },
    );
  };

  // Add a response interceptor
  addResponseInterceptors = () => {
    this.axiosClient.interceptors.response.use(
      response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        return response;
      },
      error => this.errorHandler(error),
    );
  };

  errorHandler = (error: any) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // error.response.data
      // error.response.status
      // error.response.headers
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // error.request
    } else {
      // Something happened in setting up the request that triggered an Error
      // error.message
    }
    return Promise.reject(error);
  };

  get = (
    ...params: [url: string, config?: AxiosRequestConfig]
  ): Promise<AxiosResponse> => this.axiosClient.get(...params);

  post = (...params: TApiMethodParams): Promise<AxiosResponse> => {
    return this.axiosClient.post(...params);
  };

  put(...params: TApiMethodParams): Promise<AxiosResponse> {
    return this.axiosClient.put(...params);
  }

  patch(...params: TApiMethodParams): Promise<AxiosResponse> {
    return this.axiosClient.patch(...params);
  }

  remove(
    ...params: [url: string, config: AxiosRequestConfig]
  ): Promise<AxiosResponse> {
    return this.axiosClient.delete(...params);
  }
}

export type ApiResponseType = AxiosResponse;
export default ApiService.instance;
