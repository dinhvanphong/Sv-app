import axios from 'axios'
// import { API_ROOT } from '../utils/conStants'


export const getNewsHomeAPI = async () => {
  const response = await axios.get(`https://sv.hpu.edu.vn/api/article`)
  return response.data
}
