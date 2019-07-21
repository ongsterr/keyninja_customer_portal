import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import CustomerTable from './views/CustomerTable'
import Header from './views/components/Header'
import Footer from './views/components/Footer'

import { portalDetails } from './config'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header title={portalDetails.title} logo={portalDetails.logoLink} />
      <CustomerTable />
      <Footer footerText={portalDetails.footerText} />
    </div>
  )
}

export default App
