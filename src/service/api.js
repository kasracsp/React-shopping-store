import axios from "axios"

const BASE_URL='https://fakestoreapi.com/'

const api =async () => {
  const response=await axios.get(`${BASE_URL}products`)
  return response.data
}

export default api