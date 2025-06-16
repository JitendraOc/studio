
import React from 'react';
import { Button, Typography } from 'antd';
import {
  UploadOutlined,
  OrderedListOutlined,
  BookOutlined,
  CalendarOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { format } from 'date-fns';

const { Text, Title } = Typography;

const TimelineItem = ({ module }) => {
  let AntIconComponent;
  let actionButtonText = "View Details";
  let antdButtonType = "default";

  if (module.completed) {
    AntIconComponent = CheckCircleOutlined;
    antdButtonType = "default";
    switch (module.activityType) {
      case 'assignment':
        actionButtonText = "View Submission";
        break;
      case 'quiz':
        actionButtonText = "Review Quiz";
        break;
      default:
        actionButtonText = "View Details";
    }
  } else {
    switch (module.activityType) {
      case 'assignment':
        AntIconComponent = UploadOutlined;
        actionButtonText = "Add Submission";
        antdButtonType = "primary";
        break;
      case 'quiz':
        AntIconComponent = OrderedListOutlined;
        actionButtonText = "Attempt Quiz Now";
        antdButtonType = "primary";
        break;
      case 'reading':
        AntIconComponent = BookOutlined;
        actionButtonText = "Start Reading";
        break;
      case 'event':
        AntIconComponent = CalendarOutlined;
        actionButtonText = "View Event";
        break;
      default:
        AntIconComponent = QuestionCircleOutlined;
    }
  }

  const iconColor = module.completed ? 'green' : '#1890ff';

  return (
    {
      dot: <AntIconComponent style={{ fontSize: '20px', color: iconColor }} />,
      color: module.completed ? 'green' : 'blue',
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: '16px' }}>
          <div style={{ flexGrow: 1, marginRight: '16px' }}>
            <Title level={5} style={{ marginBottom: '2px', fontWeight: '500' }}>{module.title}</Title>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              Due: {format(new Date(module.dueDate), 'MMM dd, yyyy - HH:mm')}
            </Text>
            <Text style={{ display: 'block', marginBottom: '8px' }}>
              {module.description}
              {module.category && <Text type="secondary"> - {module.category}</Text>}
            </Text>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Button type={antdButtonType} size="small">
              {actionButtonText}
            </Button>
          </div>
        </div>
      )
    }
  );
};

export default TimelineItem;
