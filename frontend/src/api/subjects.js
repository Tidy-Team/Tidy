import { instance as axios } from './axios'

export const getSubjectsRequest = async () => axios.get('/subjects')

export const createSubjectsRequest = async (subject) =>
  axios.post('/subjects', subject)

export const updateSubjectsRequest = async (id, subject) =>
  axios.put(`/subjects/${id}`, subject)

export const deleteSubjectsRequest = async (id) =>
  axios.delete(`/subjects/${id}`)

export const getSubjectRequest = async (id) => axios.get(`/subjects/${id}`)
