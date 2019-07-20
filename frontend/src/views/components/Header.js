import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    borderRadius: '50%',
    marginRight: theme.spacing(2),
  },
}))

const Header = ({ logo, title }) => {
  const classes = useStyles()

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <img
          src={logo}
          alt="Smiley face"
          height="42"
          width="42"
          className={classes.logo}
        />
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  logo: PropTypes.object,
  title: PropTypes.string,
}

export default Header
