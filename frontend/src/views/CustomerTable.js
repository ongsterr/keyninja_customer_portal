import React, { useEffect } from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'

import api from '../api'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}))

const CustomerTable = () => {
  const classes = useStyles()

  const [state, setState] = React.useState([])

  const tableColumns = [
    { title: 'Customer ID', field: '_id', hidden: true },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Email', field: 'email', type: 'string' },
  ]

  useEffect(() => {
    const getCustomerData = async () => {
      const res = await api.Customers.getAll()
      const data = res.customers

      const tableContent = {
        columns: tableColumns,
        data,
      }

      setState(tableContent)
    }

    getCustomerData()
  }, [])

  const getCustomerData = async () => {
    const res = await api.Customers.getAll()
    const data = res.customers

    return {
      columns: tableColumns,
      data,
    }
  }

  const addData = async ({ firstName, lastName, email }) => {
    const newCustomer = {
      firstName,
      lastName,
      email,
    }
    await api.Customers.create(newCustomer)

    const tableContent = await getCustomerData()
    setState(tableContent)
  }

  const updateData = async ({ _id, firstName, lastName, email }, oldData) => {
    const newCustomerData = {
      firstName,
      lastName,
      email,
    }
    await api.Customers.update(newCustomerData, _id)

    const tableContent = await getCustomerData()
    setState(tableContent)
  }

  const deleteData = async oldData => {
    const customerId = oldData._id
    await api.Customers.delete(customerId)

    const tableContent = await getCustomerData()
    setState(tableContent)
  }

  return (
    <div className={classes.root}>
      <MaterialTable
        title="Customer Data"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData => addData(newData),
          onRowUpdate: (newData, oldData) => updateData(newData, oldData),
          onRowDelete: oldData => deleteData(oldData),
        }}
        options={{
          search: true,
          pageSize: 10,
        }}
      />
    </div>
  )
}

export default CustomerTable
