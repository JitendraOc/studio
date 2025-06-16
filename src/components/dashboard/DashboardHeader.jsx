import React from 'react';
import { Layout, Typography, Avatar } from 'antd';
import { MedicineBoxOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const DashboardHeader = () => {
  return (
    <Header style={{ backgroundColor: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MedicineBoxOutlined style={{ fontSize: '28px', color: '#1890ff', marginRight: '12px' }} />
          <Title level={3} style={{ color: '#1890ff', margin: 0 }}>
            Medical Course Dashboard
          </Title>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Placeholder for user actions or info */}
          <Avatar size={40} icon={<UserOutlined />} src="https://placehold.co/100x100.png" alt="User Avatar" />
        </div>
      </div>
    </Header>
  );
};

export default DashboardHeader;
