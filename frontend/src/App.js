import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Customer from './views/Customer'
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
      <CssBaseline />
      <Header title={portalDetails.title} logo={portalDetails.logoLink} />
      <Customer />
      <Footer footerText={portalDetails.footerText} />
    </div>
  )
}

export default App
