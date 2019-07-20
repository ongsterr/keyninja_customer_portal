import React from 'react'
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const CustomerTable = ({ data }) => {
  const classes = useStyles()

  const tableContent = {
    columns: [
      { title: 'First Name', field: 'firstName' },
      { title: 'Last Name', field: 'lastName' },
      { title: 'Email', field: 'email', type: 'string' },
    ],
    data,
  }

  const [state, setState] = React.useState(tableContent)

  const addData = async newData => {
    const data = [...state.data]
    data.push(newData)
    await setState({ ...state, data })
  }

  const updateData = async (newData, oldData) => {
    const data = [...state.data]
    data[data.indexOf(oldData)] = newData
    await setState({ ...state, data })
  }

  const deleteData = async oldData => {
    const data = [...state.data]
    data.splice(data.indexOf(oldData), 1)
    await setState({ ...state, data })
  }

  return (
    <Container component="main" className={classes.main}>
      <MaterialTable
        title="Customer Data"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData => addData(newData),
          onRowUpdate: (newData, oldData) => updateData(newData, oldData),
          onRowDelete: oldData => deleteData(oldData),
        }}
      />
    </Container>
  )
}

export default CustomerTable
