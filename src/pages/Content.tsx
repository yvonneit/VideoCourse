import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import request from '../../utils/ajax';
import ModalText from '../components/ModalText';
import AddCourse from '../components/AddCourse';
import { Course } from '../types/types';
import './Content.scss';

interface Props {
  type: string;
  name: string;
}

const Content = ({ type, name }: Props) => {
  const [visible, setVisible] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>({} as Course);

  useEffect(() => {
    getContentData();
  }, [type]); //仅在 type 发生更改时更新

  const getContentData = async () => {
    try {
      const { courses } = await request.get(`courses?courseType=${type}`);
      setCourses(courses);
      console.log(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleShowModal = (course: Course, e: any) => {
    e.stopPropagation();
    setVisible(true);
    setCourse(course);
  };

  const handleUpdateData = () => {
    getContentData();
  };

  const courseList = courses.map(course => (
    <div className='course' key={course.id}>
      <div onClick={() => handleClick(course.id)}>
        <h1>{course.title}</h1>
        <p className='subtitle'>{course.subtitle}</p>
        <Button
          type='primary'
          className='button'
          onClick={e => handleShowModal(course, e)}
        >
          Edit
        </Button>
      </div>
    </div>
  ));

  return (
    <div className='wrapper'>
      <AddCourse handleUpdateData={handleUpdateData} />
      {courseList}
      <ModalText
        visible={visible}
        onClose={handleModalClose}
        typeName={name}
        course={course}
        handleUpdateData={handleUpdateData}
      />
    </div>
  );
};

export default Content;
