import axios from 'axios';

export interface PageQuery {
  current?: number;
  pageSize?: number;
}

export interface DateTimePageQuery extends PageQuery {
  beginTime?: string;
  endTime?: string;
}

export interface DateTimeQuery {
  beginTime?: string;
  endTime?: string;
}

// api 服务端api定义
export interface Result<T> {
  code: number;
  msg: string;
  data?: T;
}

export interface PageResult<T> {
  /**
   * 结果列表
   */
  records: T[];
  /**
   * 总数
   */
  total: number;
  /**
   * 当前页数
   */
  current: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 是否有上一页
   */
  hasPrevious: boolean;
  /**
   * 是否有下一页
   */
  hasNext: boolean;
}

const isSuccess = (r: Result<any>) => r.code === 200;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    if (!response || !response.status) {
      return Promise.reject('网络异常，请检查您的网络');
    }

    if (response.status !== 200) {
      return Promise.reject(`${response.status}: ${response.config.url}`);
    }

    const result = response.data as Result<any>;

    if (!isSuccess(result)) {
      return Promise.reject(`${result.msg}`);
    }

    return result.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getReq = <T>(url: string, params?: Record<string, any>): Promise<T> => {
  return instance.get(url, {
    params,
  });
};

const postReq = <T>(url: string, data: Record<string, any>): Promise<T> => {
  return instance.post(url, data);
};

const putReq = <T>(url: string, data: Record<string, any>): Promise<T> => {
  return instance.put(url, data);
};

const deleteReq = <T>(url: string, data?: Record<string, any>): Promise<T> => {
  return instance.delete(url, { data });
};

export const request = {
  get: getReq,
  post: postReq,
  put: putReq,
  delete: deleteReq,
};
