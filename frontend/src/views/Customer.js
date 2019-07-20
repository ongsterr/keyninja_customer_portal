import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CustomerTable from './CustomerTable'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const CustomerRepo = () => {
  const classes = useStyles()

  const customerData = [
    {
      firstName: 'Ali',
      lastName: 'Benny',
      email: 'ali@email.com',
    },
    {
      firstName: 'Bli',
      lastName: 'Benny',
      email: 'bli@email.com',
    },
    {
      firstName: 'Cli',
      lastName: 'Benny',
      email: 'cli@email.com',
    },
  ]

  return (
    <div className={classes.root}>
      <CustomerTable data={customerData} />
    </div>
  )
}

export default CustomerRepo
