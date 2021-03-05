import { AxiosRequestConfig, AxiosResponse, } from 'axios';
import api from './api';

const routeServicePrefix = "api/v1/Url";

class UrlService {
  createUrl(data: UrlCreate, params?: AxiosRequestConfig): Promise<AxiosResponse<UrlCreateResponse>> {
    return api.post(`${routeServicePrefix}`, data, { params: params })
  }
}

export default new UrlService();