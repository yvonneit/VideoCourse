import React, { useState, ReactElement, SFC } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import Content from './Content';

const tabList = [
  {
    key: '1',
    tab: 'Video'
  },
  {
    key: '2',
    tab: 'VIPShare'
  },
  {
    key: '3',
    tab: 'Sprout'
  }
];

const Home: SFC<RouteComponentProps> = () => {
  const [key, setKey] = useState('1');

  const contentList: { [k: string]: ReactElement } = {
    '1': <Content type={key} name={tabList[0].tab} />,
    '2': <Content type={key} name={tabList[1].tab} />,
    '3': <Content type={key} name={tabList[2].tab} />
  };

  contentList;

  return (
    <div>
      <Card
        style={{ width: '100%', height: 50 }}
        title='Video Course'
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => setKey(key)}
      >
        {contentList[key]}
      </Card>
    </div>
  );
};

export default Home;
