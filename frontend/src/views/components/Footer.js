import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'black',
    height: '10vh',
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
}))

const StickyFooter = ({ footerText }) => {
  const classes = useStyles()

  return (
    <div>
      <footer className={classes.footer}>
        <Typography variant="body2" className={classes.text}>
          {footerText}
        </Typography>
      </footer>
    </div>
  )
}

StickyFooter.propTypes = {
  footerText: PropTypes.string,
}

export default StickyFooter
