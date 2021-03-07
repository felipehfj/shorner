import { AxiosRequestConfig, AxiosResponse, } from 'axios';
import api from './api';

const routeServicePrefix = "api/v1/urls";

class UrlService {
  createUrl(data: UrlCreate, params?: AxiosRequestConfig): Promise<AxiosResponse<UrlCreateResponse>> {
    return api.post(`${routeServicePrefix}`, data, { params: params })
  }

  redirect(shortId: string, params?: AxiosRequestConfig): Promise<AxiosResponse<Array<UrlModel>>> {
    return api.get(`${routeServicePrefix}/${shortId}/redirect`, { params: params })
  }

  index(params?: AxiosRequestConfig): Promise<AxiosResponse<Array<UrlModel>>> {
    return api.get(`${routeServicePrefix}`, { params: params })
  }

  getOne(shortId: string, params?: AxiosRequestConfig): Promise<AxiosResponse<{ url: UrlModel, urlAccess: Array<UrlAccessModel> }>> {
    return api.get(`${routeServicePrefix}/${shortId}`, { params: params })
  }

  statistic(shortId: string, params?: AxiosRequestConfig): Promise<AxiosResponse<UrlStatisticResponse>> {
    return api.get(`${routeServicePrefix}/${shortId}`, { params: params })
  }
}

export default new UrlService();