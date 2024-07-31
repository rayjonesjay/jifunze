"use client"

import axios from 'axios';

const API_BASE_URL = 'http://yourapi.com';

export const getCourses = () => {
    return axios.get(`${API_BASE_URL}/courses`);
};

export const enrollInCourse = (courseId) => {
    return axios.post(`${API_BASE_URL}/enroll`, { courseId });
};

export const getEnrollments = () => {
    return axios.get(`${API_BASE_URL}/enrollments`);
};

export const updateProgress = (courseId, progress) => {
    return axios.post(`${API_BASE_URL}/progress`, { courseId, progress });
};
