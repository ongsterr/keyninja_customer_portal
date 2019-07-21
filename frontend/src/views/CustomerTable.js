import React, { useEffect } from 'react'
import MaterialTable, { MTableToolbar } from 'material-table'
import { makeStyles } from '@material-ui/core/styles'

// components
import MessageBox from './components/Snackbar'
import FileUploadButton from './components/FileUpload'

// others
import api from '../api'
import { StringHelper } from '../utils'
import { tableDetails, uploadConfig } from '../config'
import { uploadFile } from '../features/fileUpload'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mtoolbar: {
    minWidth: '70vw',
  },
}))

const CustomerTable = () => {
  const classes = useStyles()

  // Stage management
  const [state, setState] = React.useState([])
  const [error, setError] = React.useState({ open: false, msg: '' })

  // Before component mount
  useEffect(() => {
    const getCustomerData = async () => {
      const res = await api.Customers.getAll()
      const data = res.customers.map(customer => {
        const capitalizedFirstName = StringHelper.capitalize(customer.firstName)
        const capitalizedLastName = StringHelper.capitalize(customer.lastName)
        return {
          ...customer,
          firstName: capitalizedFirstName,
          lastName: capitalizedLastName,
        }
      })

      const tableContent = {
        columns: tableDetails.tableColumns,
        data,
      }

      setState(tableContent)
    }

    getCustomerData()
  }, [])

  // Other logic functions
  const getCustomerData = async () => {
    const res = await api.Customers.getAll()
    const data = res.customers.map(customer => {
      const capitalizedFirstName = StringHelper.capitalize(customer.firstName)
      const capitalizedLastName = StringHelper.capitalize(customer.lastName)
      return {
        ...customer,
        firstName: capitalizedFirstName,
        lastName: capitalizedLastName,
      }
    })

    return {
      columns: tableDetails.tableColumns,
      data,
    }
  }

  const fileUploadHandler = async event => {
    const completeCallback = async (results, file) => {
      const csvData = results.data
      const csvFileColumnCheck =
        Object.keys(csvData[0]).join('') !== uploadConfig.columns.join('')

      if (csvFileColumnCheck) {
        setError({ open: true, msg: 'Error: data format is not correct.' })
        return
      }

      api.Customers.create(csvData)
        .then(res => {
          checkValidationError(res)
        })
        .then(async () => {
          const tableContent = await getCustomerData()
          setState(tableContent)
        })
        .catch(err => console.log(err))
    }

    const errorCallback = (error, file) => {
      setError({ open: true, msg: error })
    }

    await uploadFile(event.target.files[0], completeCallback, errorCallback)
  }

  const checkValidationError = res => {
    if (res.errors && res.errors.error === 'ValidationError') {
      setError({ open: true, msg: res.errors.message })
    } else if (res.errors && res.errors.error === 'MongoError') {
      setError({ open: true, msg: res.errors.message })
    }
  }

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setError({ open: false, msg: '' })
  }

  const addData = async ({ firstName, lastName, email }) => {
    const newCustomer = [
      {
        firstName,
        lastName,
        email,
      },
    ]

    const res = await api.Customers.create(newCustomer)

    checkValidationError(res)
    const tableContent = await getCustomerData()
    setState(tableContent)
  }

  const updateData = async ({ _id, firstName, lastName, email }, oldData) => {
    const newCustomerData = {
      firstName,
      lastName,
      email,
    }
    const res = await api.Customers.update(newCustomerData, _id)

    checkValidationError(res)
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
      <MessageBox
        message={error.msg}
        handleClose={(event, reason) => handleCloseError(event, reason)}
        open={error.open}
        messageType={'error'}
      />
      <MaterialTable
        title={tableDetails.tableTitle}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData => addData(newData),
          onRowUpdate: (newData, oldData) => updateData(newData, oldData),
          onRowDelete: oldData => deleteData(oldData),
        }}
        options={tableDetails.tableOptions}
        components={{
          Toolbar: props => (
            <div className={classes.toolbar}>
              <div className={classes.mtoolbar}>
                <MTableToolbar {...props} />
              </div>
              <FileUploadButton
                fileUploadHandler={event => fileUploadHandler(event)}
              />
            </div>
          ),
        }}
      />
    </div>
  )
}

export default CustomerTable
