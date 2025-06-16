import React from 'react';
import { Card, Avatar, Typography, Button, Space } from 'antd';
import { CustomerServiceOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SupportSection = ({ contact }) => {
  if (!contact) {
    return null; // Or a placeholder if contact is essential
  }

  const cardTitle = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CustomerServiceOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
      <Title level={4} style={{ margin: 0 }}>Support & Guidance</Title>
    </div>
  );

  return (
    <Card
      title={cardTitle}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} // Approximating shadow-lg
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar size={64} src={contact.avatarUrl} icon={<UserOutlined />}>
            {contact.avatarFallback}
          </Avatar>
          <div style={{ marginLeft: '16px' }}>
            <Title level={5} style={{ margin: 0 }}>{contact.name}</Title>
            <Text type="secondary">{contact.role}</Text>
          </div>
        </div>

        <Space direction="vertical" size="small">
          <a href={`mailto:${contact.email}`} style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <MailOutlined style={{ marginRight: '8px', color: '#888' }} />
            <Text>{contact.email}</Text>
          </a>
          <a href={`tel:${contact.phone}`} style={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <PhoneOutlined style={{ marginRight: '8px', color: '#888' }} />
            <Text>{contact.phone}</Text>
          </a>
        </Space>

        <Button block icon={<CustomerServiceOutlined />} style={{ marginTop: '8px' }}>
          Contact Support
        </Button>
      </Space>
    </Card>
  );
};

export default SupportSection;
