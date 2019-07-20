import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
}))

const StickyFooter = () => {
  const classes = useStyles()

  return (
    <div>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Typography variant="body1" className={classes.text}>
            My sticky footer can be found here.
          </Typography>
        </Container>
      </footer>
    </div>
  )
}

export default StickyFooter
