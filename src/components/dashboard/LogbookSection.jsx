import React from 'react';
import { Card, List, Typography } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import LogEntryItem from './LogEntryItem';

const { Text } = Typography;

const LogbookSection = ({ entries }) => {
  const recentEntries = entries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10); // Show latest 10

  const cardTitle = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ProfileOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
      <span style={{ fontSize: '18px', fontWeight: '500' }}>Recent Activity</span>
    </div>
  );

  return (
    <Card
      title={cardTitle}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} // Approximating shadow-lg
      styles={{ body: { height: '270px', overflowY: 'auto', padding: recentEntries.length > 0 ? '0 24px 16px' : '24px' } }} // Adjust padding based on content
    >
      {recentEntries.length === 0 ? (
        <Text type="secondary">No recent activity.</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={recentEntries}
          renderItem={entry => (
            // AntD List.Item provides its own padding and borders if needed.
            // LogEntryItem has some internal padding which might need adjustment.
            <List.Item style={{ padding: '0px', borderBottom: 'none' }}>
              <LogEntryItem entry={entry} />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default LogbookSection;
