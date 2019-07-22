import React, { useState, SFC } from 'react';
import { Modal, Input, Select, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import request from '../../utils/ajax';
import { Course } from '../types/types';
import AddImage from '../asset/images/add.png';
import './add.scss';

const { Option } = Select;

interface Props extends FormComponentProps {
  handleUpdateData: () => void;
}

const AddCourse: SFC<Props> = props => {
  const {
    form: { getFieldDecorator, getFieldValue, resetFields }
  } = props;

  const [visible, setVisible] = useState(false);
  const [selectValue, setSelectValue] = useState(1);

  const handleModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      await request.post('/course', {
        type: selectValue,
        title: getFieldValue('title'),
        subtitle: getFieldValue('subtitle'),
        coverID: '5d009e519ca591000130e155',
        descriptions: [
          {
            descriptionImgID: '',
            descriptionImgURL: '',
            descriptionText: '21'
          }
        ]
      });

      props.handleUpdateData();
      setVisible(false);
      resetFields(); //重置输入控件的值
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (value: string) => {
    setSelectValue(parseInt(value));
  };

  return (
    <div className='add-wrapper'>
      <div className='add-course' onClick={handleModal}>
        <img src={AddImage} className='add-image' />
        <p>New Video Course</p>
      </div>
      <Modal
        title='New Course'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label='Type'>
            {getFieldDecorator('type', {
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
              rules: [
                {
                  required: true,
                  message: 'Please input title'
                }
              ],
              getValueFromEvent: e => {
                const { value } = e.target;
                return value.trim() === '' ? '' : value;
              }
            })(<Input />)}
          </Form.Item>
          <Form.Item label={<span>Subtitle</span>}>
            {getFieldDecorator('subtitle', {
              rules: [
                {
                  required: true,
                  message: 'Please input subtitle'
                }
              ],
              getValueFromEvent: e => {
                const { value } = e.target;
                return value.trim() === '' ? '' : value;
              }
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Form.create<Props>()(AddCourse);
