"use client"

import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import Courses from './Courses';
import Enrollments from './Enrollments';

const items = [
    {
        label: 'Courses',
        key: 'courses',
        // icon: <MailOutlined />,
    },
    {
        label: 'Enrollments',
        key: 'enrollments',
        // icon: <AppstoreOutlined />,
    },

];

const App = () => {
    const [currentTab, setCurrentTab] = useState('courses');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrentTab(e.key);
    };

    return (
        <Layout>
            <Header>
                <Menu onClick={onClick} selectedKeys={[currentTab]} mode="horizontal" items={items} />;
            </Header>
            <Content style={{ padding: '50px' }}>
                {currentTab === 'courses' && <Courses />}
                {currentTab === 'enrollments' && <Enrollments />}
            </Content>
        </Layout>
    );
};
export default App;

const { Header, Content } = Layout;
