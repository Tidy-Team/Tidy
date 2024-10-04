import { instance as axios } from './axios'

export const getActivitiesRequest = async (id) => axios.get(`/activities/${id}`)

export const createActivitiesRequest = async (id) =>
  axios.post(`/activities/${id}`)

export const updateActivitiesRequest = async (id) =>
  axios.put(`/activities/${id}`)

export const deleteActivitiesRequest = async (id) =>
  axios.delete(`/activities/${id}`)
