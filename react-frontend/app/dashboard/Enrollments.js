"use client"

import React, { useEffect, useState } from 'react';
import { List, Card, Progress, Button, message } from 'antd';
import axios from 'axios';

import { createClient } from '@supabase/supabase-js'
import {supabase_anon_key, supabase_url} from "../const/constants";
const supabase = createClient(supabase_url, supabase_anon_key)


const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect( () => {

        async function fetchData() {
            let { data: enrollments, error } = await supabase
                .from('enrollments')
                .select('*')

            if (error) {
                message.error('Failed to load enrollments')
            } else {
                setEnrollments(enrollments)
            }
        }

        fetchData();

        // Fetch enrollments from API
        // axios.get('/api/enrollments')
        //     .then(response => setEnrollments(response.data))
        //     .catch(error => message.error('Failed to load enrollments'));
        //
    }, []);

    const updateProgress = (courseId, progress) => {
        axios.post('/progress', { courseId, progress })
            .then(response => message.success('Progress updated'))
            .catch(error => message.error('Failed to update progress'));
    };

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={enrollments}
            renderItem={enrollment => (
                <List.Item>
                    <Card title={enrollment.course_id}>
                        <Progress percent={enrollment.course_id} />
                        <Button type="primary" onClick={() => updateProgress(enrollment.course_id, enrollment.course_id + 10)}>
                            Update Progress
                        </Button>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default Enrollments;
