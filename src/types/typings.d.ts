// @ts-ignore
/* eslint-disable */

import { TablePaginationConfig } from 'antd';
import { FilterValue } from 'antd/es/table/interface';

declare namespace API {
  type User = {
    id: number;
    username: string;
    status: number;
    avatar: string;
    createTime: Date;
  };

  type CurrentUser = {
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    deviceId?: string;
    mobile?: string;
    captcha?: string;
    type?: string;
  };

  type CaptchaParams = {
    deviceId?: string;
    mobile?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type TableParams = {
    pagination?: TablePaginationConfig;
    order?: any;
    filters?: Record<string, FilterValue>;
  };
}
