import axios from "axios"

const api = axios.create({
  baseURL: "https://resume-builder-api-8oh6.onrender.com",
})

export default api