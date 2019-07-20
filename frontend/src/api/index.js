import axios from './init'

let token = null
const setToken = _token => (token = _token)

const requests = {
  get: async url => {
    const response = await axios({
      method: 'get',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
    })
    return response.data
  },
  post: async (url, body) => {
    const response = await axios({
      method: 'post',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
      data: body,
    })
    return response.data
  },
  put: async (url, body) => {
    const response = await axios({
      method: 'put',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
      data: body,
    })
    return response.data
  },
  delete: async url => {
    const response = await axios({
      method: 'delete',
      url,
      headers: token ? { Authorization: `Bearer ${token}` } : '',
    })
    return response.data
  },
}

const limit = (count, p) => `limit=${count}&offset=${p ? p : 0}`

const Customers = {
  getAll: page => requests.get(`/customers?${limit(10, page)}`),
  create: customer => requests.post('/customers', { customer }),
  update: (customer, customerId) =>
    requests.put(`/customers/${customerId}`, { customer }),
  delete: customerId => requests.delete(`/customers/${customerId}`),
}

export default {
  Customers,
  setToken,
}
