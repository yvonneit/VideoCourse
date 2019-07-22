import React, { useState, SFC } from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import request from '../../utils/ajax';
import { Course } from '../types/types';

interface Props extends FormComponentProps {
  visible: boolean;
  typeName: string;
  course: Course;
  onClose: () => void;
  handleUpdateData: () => void;
}

const { Option } = Select;

const ModalContent: SFC<Props> = props => {
  const {
    visible,
    typeName,
    onClose,
    course,
    handleUpdateData,
    form: { getFieldDecorator, getFieldValue }
  } = props;

  console.log('course', course);

  const [selectValue, setSelectValue] = useState(1);

  const handleChange = (value: string) => {
    const selectValue = parseInt(value);
    setSelectValue(selectValue);
  };

  const handleOk = async () => {
    const type = selectValue ? selectValue : course.type;
    try {
      await request.put('/course', {
        ...course,
        type: type,
        title: getFieldValue('title'),
        subtitle: getFieldValue('subtitle')
      });
    } catch (error) {
      console.error(error);
    }
    onClose();
    handleUpdateData();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title='Edit Course'
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label='Type'>
          {getFieldDecorator('type', {
            initialValue: typeName,
            rules: [{ required: true, message: 'Please select type' }]
          })(
            <Select placeholder='Select a type' onChange={handleChange}>
              <Option value='1'>Video</Option>
              <Option value='2'>VIPShare</Option>
              <Option value='3'>Sprout</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label={<span>Title</span>}>
          {getFieldDecorator('title', {
            initialValue: course.title,
            rules: [
              {
                required: true,
                message: 'Please input title'
              }
            ],
            getValueFromEvent: (e: any) => {
              const { value } = e.target;
              return value.trim() === '' ? '' : value;
            }
          })(<Input />)}
        </Form.Item>
        <Form.Item label={<span>Subtitle</span>}>
          {getFieldDecorator('subtitle', {
            initialValue: course.subtitle,
            rules: [
              {
                required: true,
                message: 'Please input subtitle'
              }
            ],
            getValueFromEvent: (e: any) => {
              const { value } = e.target;
              return value.trim() === '' ? '' : value;
            }
          })(<Input />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create<Props>()(ModalContent);
