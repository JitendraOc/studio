import React from 'react';
import { Typography } from 'antd';
import { format } from 'date-fns';

const { Text } = Typography;

const LogEntryItem = ({ entry }) => {
  // Assuming this component will be used within an Ant Design List.Item,
  // the padding and hover effects would typically be handled by the List.Item itself.
  // If used standalone, specific styling for padding/hover might be needed.
  return (
    <div style={{ padding: '8px 0px' }}> {/* Basic padding, can be customized or removed if part of List.Item */}
      <Text type="secondary" style={{ fontSize: '12px' }}>{format(new Date(entry.date), 'MMM dd, yyyy - HH:mm')}</Text>
      <Text strong style={{ display: 'block', fontSize: '14px', margin: '4px 0' }}>{entry.activity}</Text>
      {entry.details && <Text type="secondary" style={{ fontSize: '12px' }}>{entry.details}</Text>}
    </div>
  );
};

export default LogEntryItem;
