import axios from 'axios'

const config = {
  baseURL:
    process.env.REACT_APP_ENV === 'production'
      ? process.env.REACT_APP_SERVER_URL
      : 'http://localhost:3001/',
}
const instance = axios.create(config)

export default instance
