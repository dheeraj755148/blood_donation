import axios from 'axios'

//export const BASE_URL = 'http://localhost:9000/'
export const BASE_URL = 'https://bloodonation.onrender.com'

export const authApi = axios.create({
  baseURL: BASE_URL,
})

export const axiosloginUser = async (data) => {
  return await authApi.post('user-login', data)
}
export const axiosRegisterUser = async (data) => {
  return await authApi.post('user-register', data)
}

export const axiosGetDonorData = async () => {
  return await authApi.post('get-donor')
}

export const axiosEditDonor = async (data) => {
  return await authApi.post('edit-donor', data)
}
export const axiosDeleteDonor = async (data) => {
  return await authApi.post('delete-donor', data)
}
