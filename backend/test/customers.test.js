const request = require('supertest')
const expect = require('chai').expect

const { server, shutdown } = require('../src/app')

describe('Testing all customers endpoints', () => {
  after(() =>
    setTimeout(() => {
      shutdown()
    }, 2000)
  )

  const customersData = {
    customers: [
      {
        firstName: 'Tom',
        lastName: 'Jerry',
        email: 'tom@email.com',
      },
    ],
  }

  let customerId

  describe('Create new customers', () => {
    it('should create new customer successfully', function(done) {
      request(server)
        .post('/customers')
        .send(customersData)
        .set('Accept', 'application/json')
        .expect(200)
        .then(res => {
          expect(res.body.customers.length).to.equal(
            customersData.customers.length
          )
          done()
        })
    })
  })

  describe('Get all customer details', () => {
    it('should get all customer details', async () => {
      const response = await request(server).get('/customers')
      customerId = response.body.customers[0]._id
      const customerData = response.body.customers

      expect(customerData.length).to.equal(customersData.customers.length)
      expect(customerData[0].firstName).to.equal(
        customersData.customers[0].firstName.toLowerCase()
      )
    })
  })

  describe('Update customer details', () => {
    it('should update customer details', done => {
      const updatedCustomerData = {
        customer: {
          firstName: 'BigTom',
          lastName: 'SmallJerry',
          email: 'timmy@email.com',
        },
      }

      request(server)
        .put(`/customers/${customerId}`)
        .send(updatedCustomerData)
        .expect(200)
        .then(res => {
          const newCustomerData = res.body.customer
          expect(newCustomerData.firstName).to.equal(
            updatedCustomerData.customer.firstName.toLowerCase()
          )
          done()
        })
        .catch(err => console.log(err))
    })
  })

  describe('Delete customer', () => {
    it('should delete customer', done => {
      request(server)
        .delete(`/customers/${customerId}`)
        .expect(204, done)
    })
  })
})
