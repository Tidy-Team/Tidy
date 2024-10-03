import { instance as axios } from './axios';

export const getActivitiesRequest = async () => axios.get('/activities');

export const createActivitiesRequest = async activity => axios.post('/activities', activity);

export const updateActivitiesRequest = async (id, activity) => axios.put(`/activities/${id}`, activity);

export const deleteActivitiesRequest = async id => axios.delete(`/activities/${id}`);

export const getActivityRequest = async id => axios.get(`/activities/${id}`);
