"use client"

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, message, List, Button } from 'antd';
import axios from 'axios';

const { Sider, Content } = Layout;

const Learn = () => {
    const [course, setCourse] = useState({});
    const [currentSubtopic, setCurrentSubtopic] = useState(null);
    const [currentVideo, setCurrentVideo] = useState('');

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course_id'); // Get a specific parameter value
    // const allParams = Object.fromEntries(urlParams); // Convert to an object with all parameters

    if (!courseId) {
        message.error('Failed to load courses')
    } else {
        useEffect(() => {
            // Fetch course details including topics and subtopics
            axios.get(`/api/courses/${courseId}`)
                .then(response => setCourse(response.data))
                .catch(error => message.error('Failed to load course details'));
        }, [courseId]);
    }

    const handleSubtopicClick = (subtopic) => {
        setCurrentSubtopic(subtopic);
        setCurrentVideo(subtopic.videoUrl);

        // Notify backend about the current subtopic started
        axios.post('/api/progress', { courseId, subtopicId: subtopic.id, status: 'started' })
            .then(response => message.success('Subtopic started'))
            .catch(error => message.error('Failed to notify subtopic start'));
    };

    const handleCompleteSubtopic = () => {
        // Notify backend about the subtopic completed
        axios.post('/api/progress', { courseId, subtopicId: currentSubtopic.id, status: 'completed' })
            .then(response => message.success('Subtopic completed'))
            .catch(error => message.error('Failed to notify subtopic completion'));
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {course.topics && course.topics.map(topic => (
                        <Menu.SubMenu key={topic.id} title={topic.title}>
                            {topic.subtopics.map(subtopic => (
                                <Menu.Item key={subtopic.id} onClick={() => handleSubtopicClick(subtopic)}>
                                    {subtopic.title}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>
                <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
                    {currentSubtopic && (
                        <Card
                            title={currentSubtopic.title}
                            extra={<Button onClick={handleCompleteSubtopic}>Complete Subtopic</Button>}
                            style={{ marginBottom: '20px' }}
                        >
                            <video width="100%" controls src={currentVideo}></video>
                            <div style={{ marginTop: '20px' }}>
                                <h3>More Information</h3>
                                <p>{currentSubtopic.description}</p>
                            </div>
                        </Card>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Learn;
