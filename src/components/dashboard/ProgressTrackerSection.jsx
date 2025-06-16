import React from 'react';
import { Card, Progress, Typography, Space } from 'antd';
import { RiseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProgressTrackerSection = ({ modules }) => {
  const totalModules = modules.length;

  const unlockedCount = modules.filter(m => m.unlocked).length;
  const unlockedProgress = totalModules > 0 ? Math.round((unlockedCount / totalModules) * 100) : 0;

  const completedCount = modules.filter(m => m.completed).length;
  const courseCompletionProgress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const cardTitle = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <RiseOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
      <Title level={4} style={{ margin: 0 }}>Your Progress</Title>
    </div>
  );

  return (
    <Card
      title={cardTitle}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} // Approximating shadow-lg
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <Text strong>Module Access</Text>
            <Text type="secondary">{unlockedCount} / {totalModules} Modules Unlocked</Text>
          </div>
          <Progress percent={unlockedProgress} size="small" aria-label="Unlocked modules progress" />
          <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>
            Progress based on currently accessible modules.
          </Text>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <Text strong>Overall Course Completion</Text>
            <Text type="secondary">{completedCount} / {totalModules} Modules Completed</Text>
          </div>
          <Progress percent={courseCompletionProgress} size="small" aria-label="Total course completion progress" />
          <Text type="secondary" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>
            Progress based on successfully completed modules.
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default ProgressTrackerSection;
