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
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState([])
  const [info, setInfo] = React.useState({
    open: false,
    msgType: 'error',
    msg: '',
  })

  // Before component mount
  useEffect(() => {
    const getCustomerData = async () => {
      setLoading(true)
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
      setLoading(false)
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
        setInfo({
          open: true,
          msgType: 'error',
          msg: 'Error: data format is not correct.',
        })
        return
      }

      api.Customers.create(csvData)
        .then(res => {
          checkValidationError(res)
        })
        .then(async () => {
          setLoading(true)
          const tableContent = await getCustomerData()
          setState(tableContent)
          setLoading(false)
          setInfo({
            open: true,
            msgType: 'success',
            msg: 'Customer data successfully uploaded',
          })
        })
        .catch(err => console.log(err))
    }

    const errorCallback = (error, file) => {
      setInfo({ open: true, msgType: 'error', msg: error })
    }

    await uploadFile(event.target.files[0], completeCallback, errorCallback)
  }

  const checkValidationError = res => {
    if (res.errors && res.errors.error === 'ValidationError') {
      setInfo({ open: true, msgType: 'error', msg: res.errors.message })
    } else if (res.errors && res.errors.error === 'MongoError') {
      setInfo({ open: true, msgType: 'error', msg: res.errors.message })
    }
  }

  const handleCloseInfoBox = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setInfo({ ...info, open: false })
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
    setInfo({
      open: true,
      msgType: 'success',
      msg: 'Customer data successfully added',
    })
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
    setInfo({
      open: true,
      msgType: 'success',
      msg: 'Customer data successfully updated',
    })
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
        message={info.msg}
        handleClose={(event, reason) => handleCloseInfoBox(event, reason)}
        open={info.open}
        messageType={info.msgType}
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
        isLoading={loading}
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
