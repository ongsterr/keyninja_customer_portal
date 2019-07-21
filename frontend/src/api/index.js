import axios from './init'

let token = null
const setToken = _token => (token = _token)

const requests = {
  get: async url => {
    try {
      const response = await axios({
        method: 'get',
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : '',
      })
      return response.data
    } catch (err) {
      return err
    }
  },
  post: async (url, body) => {
    try {
      const response = await axios({
        method: 'post',
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : '',
        data: body,
      })
      return response.data
    } catch (err) {
      return err
    }
  },
  put: async (url, body) => {
    try {
      const response = await axios({
        method: 'put',
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : '',
        data: body,
      })
      return response.data
    } catch (err) {
      return err
    }
  },
  delete: async url => {
    try {
      const response = await axios({
        method: 'delete',
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : '',
      })
      return response.data
    } catch (err) {
      return err
    }
  },
}

const limit = (count, p) => `limit=${count}&offset=${p ? p : 0}`

const Customers = {
  getAll: page => requests.get(`/customers?${limit(1000, page)}`),
  create: customers => requests.post('/customers', { customers }),
  update: (customer, customerId) =>
    requests.put(`/customers/${customerId}`, { customer }),
  delete: customerId => requests.delete(`/customers/${customerId}`),
}

export default {
  Customers,
  setToken,
}
