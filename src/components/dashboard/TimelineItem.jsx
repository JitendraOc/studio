
import React from 'react';
import { Timeline, Button, Typography, Space } from 'antd';
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

const TimelineItem = ({ module, isLastItem /* isLastItem is not used by AntD Timeline.Item directly */ }) => {
  let AntIconComponent;
  let actionButtonText = "View Details";
  let antdButtonType = "default"; // 'primary', 'ghost', 'dashed', 'link', 'text', 'default'

  if (module.completed) {
    AntIconComponent = CheckCircleOutlined;
    antdButtonType = "default"; // Or perhaps 'dashed' for a less prominent completed action
    switch (module.activityType) {
      case 'assignment':
        actionButtonText = "View Submission";
        break;
      case 'quiz':
        actionButtonText = "Review Quiz";
        break;
      default:
        actionButtonText = "View Details"; // Keep as default
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
        // antdButtonType remains 'default' (outline-like)
        break;
      case 'event':
        AntIconComponent = CalendarOutlined;
        actionButtonText = "View Event";
        // antdButtonType remains 'default'
        break;
      default:
        AntIconComponent = QuestionCircleOutlined;
        // antdButtonType remains 'default'
    }
  }

  const iconColor = module.completed ? 'green' : '#1890ff'; // AntD primary blue

  return (
    <Timeline.Item
      dot={<AntIconComponent style={{ fontSize: '20px', color: iconColor }} />}
      color={module.completed ? 'green' : 'blue'} // Line color
      // The 'label' prop could be used for the time, for a left-aligned time column
      // label={<Text type="secondary">{format(new Date(module.dueDate), 'HH:mm')}</Text>}
      style={{ paddingBottom: '20px' }} // Mimic py-4, adjust as needed
    >
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
    </Timeline.Item>
  );
};

export default TimelineItem;
