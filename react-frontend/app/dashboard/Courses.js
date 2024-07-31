"use client"

import React, { useEffect, useState } from 'react';
import { Card, Button, List, message } from 'antd';
import axios from 'axios';

import { createClient } from '@supabase/supabase-js'
import {supabase_anon_key, supabase_url} from "../const/constants";
const supabase = createClient(supabase_url, supabase_anon_key)

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect( () => {

        async function getData() {
            let {data: courses, error} = await supabase
                .from('courses')
                .select('*')

            if (error) {
                message.error('Failed to load courses')
            } else {
                setCourses(courses)
            }
        }
        getData().then();

        // Fetch courses from API
        // axios.get('/api/courses')
        //     .then(response => setCourses(response.data))
        //     .catch(error => message.error('Failed to load courses'));
        //

    }, []);

    const handleEnroll = (courseId) => {
        // Enroll the student in the course
        axios.post('/api/enroll', { courseId })
            .then(response => message.success('Enrolled successfully'))
            .catch(error => message.error('Enrollment failed'));
    };

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={courses}
            renderItem={course => (
                <List.Item>
                    <Card title={course.title}>
                        <p>{course.description}</p>
                        <Button type="primary" onClick={() => handleEnroll(course.id)}>Enroll</Button>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default Courses;
