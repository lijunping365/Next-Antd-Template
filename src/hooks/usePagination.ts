import { useEffect, useState } from 'react';
import { message, TablePaginationConfig } from 'antd';
import { PageQuery, PageResult } from '@/lib/request';
import { API } from '@/types/typings';

/**
 * antd table 分页请求钩子
 *
 * <p>
 *   @param request 你的数据请求 api
 *   @return [
 *      data：table 数据，
 *      loading： 加载状态，
 *      tableParams：分页参数，
 *      onTableChange：切换分页事件，
 *      fetchData：方便外部主动触发数据加载
 *   ]
 * </p>
 *
 */
const usePaginationRequest = <T>(
  request: (params: PageQuery) => Promise<PageResult<T>>
): [
  T[],
  boolean,
  API.TableParams,
  (pagination: TablePaginationConfig) => void,
  () => Promise<void>,
] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<API.TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: PageResult<T> = await request({
        current: tableParams.pagination?.current,
        pageSize: tableParams.pagination?.pageSize,
      });

      setData(response?.records);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.total,
        },
      });
    } catch (error) {
      message.error('服务繁忙，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const onTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, [JSON.stringify(tableParams)]);

  return [data, loading, tableParams, onTableChange, fetchData];
};

export default usePaginationRequest;
