
import React from 'react';
import { Card, Tabs, Timeline, Typography } from 'antd';
import { ScheduleOutlined } from '@ant-design/icons';
import TimelineItem from './TimelineItem'; // Assuming this is the converted AntD compatible item
import { format, parse } from 'date-fns';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const groupTasksByDate = (tasks) => {
  return tasks.reduce((acc, task) => {
    const dateStr = format(new Date(task.dueDate), 'EEEE, d MMMM yyyy');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(task);
    return acc;
  }, {});
};

const renderTimelineForTasks = (tasks, titleSuffix) => {
  if (!tasks || tasks.length === 0) {
    return <Text type="secondary" style={{ textAlign: 'center', display: 'block', padding: '32px 0' }}>No {titleSuffix.toLowerCase()} tasks.</Text>;
  }

  const groupedTasks = groupTasksByDate(tasks);
  const sortedDateKeys = Object.keys(groupedTasks).sort((a, b) => {
    // Parse the date string back to Date object for sorting
    const dateA = parse(a, 'EEEE, d MMMM yyyy', new Date());
    const dateB = parse(b, 'EEEE, d MMMM yyyy', new Date());
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div style={{ height: '400px', overflowY: 'auto', paddingRight: '16px' }}>
      {sortedDateKeys.map(dateKey => (
        <div key={dateKey} style={{ marginBottom: '16px' }}>
          <Title level={5} style={{ color: '#1890ff', margin: '16px 0 8px 0', /* Removed sticky behavior */ }}>
            {dateKey}
          </Title>
          <Timeline>
            {groupedTasks[dateKey]
              .sort((taskA, taskB) => new Date(taskA.dueDate).getTime() - new Date(taskB.dueDate).getTime())
              .map(module => (
                <TimelineItem key={module.id} module={module} /> // isLastItem is not needed
              ))}
          </Timeline>
        </div>
      ))}
    </div>
  );
};

const WeeklyTasksSection = ({ modules }) => {
  const currentDueTasks = modules
    .filter(m => m.unlocked && !m.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const pastDueTasks = modules // This means "completed tasks"
    .filter(m => m.unlocked && m.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const cardTitle = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ScheduleOutlined style={{ fontSize: '22px', color: '#1890ff', marginRight: '8px' }} />
      <Title level={4} style={{ margin: 0 }}>Timeline</Title>
    </div>
  );

  return (
    <Card
      title={cardTitle}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      <Tabs defaultActiveKey="currentDue" centered>
        <TabPane tab="Current Due" key="currentDue">
          {renderTimelineForTasks(currentDueTasks, "Current Due")}
        </TabPane>
        <TabPane tab="Past Due / Completed" key="pastDue">
          {renderTimelineForTasks(pastDueTasks, "Past Due / Completed")}
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default WeeklyTasksSection;
