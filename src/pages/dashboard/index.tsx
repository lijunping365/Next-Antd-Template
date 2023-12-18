import React, { useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { BarChartOutlined, DashboardOutlined } from '@ant-design/icons';
import BaseLayout from '@/components/Layout';

const TableList: React.FC = () => {
  const [statisticLoading, setStatisticLoading] = useState<boolean>(true);
  const [chartLoading, setChartLoading] = useState<boolean>(true);
  const [statisticNumber, setStatisticNumber] = useState<any>();
  const [chartData, setChartData] = useState([]);

  return (
    <BaseLayout>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title='应用数量'
              value={statisticNumber?.appNum || 20}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title='任务总数'
              value={statisticNumber?.taskRunningNum || 1980}
              prefix={<DashboardOutlined />}
              suffix={`/ ${statisticNumber?.taskTotalNum}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title='执行器总数'
              value={statisticNumber?.executorOnlineNum || 80}
              prefix={<BarChartOutlined />}
              suffix={`/ ${statisticNumber?.executorTotalNum}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              loading={statisticLoading}
              title='今日报警次数'
              value={statisticNumber?.alarmNum || 10}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        loading={chartLoading}
        bordered={false}
        title='任务调度次数'
        style={{
          marginTop: '20px',
        }}
      ></Card>
    </BaseLayout>
  );
};

export default TableList;
