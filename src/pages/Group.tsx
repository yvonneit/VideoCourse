import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Table } from 'antd';
import request from '../../utils/ajax';

interface Props extends RouteComponentProps {
  id?: string;
}

const Group = (props: Props) => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Detail',
      key: 'action',
      render: () => <a>detail</a>
    }
  ];

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function getGroupsData() {
      try {
        const { groups } = await request.get(`course/${props.id}`);
        setGroups(groups);
      } catch (error) {
        console.error(error);
      }
    }
    getGroupsData();
  }, [props.id]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={groups}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default Group;
