import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import UploadFileIcon from '@material-ui/icons/Backup'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}))

const CustomIconButton = ({ fileUploadHandler }) => {
  const classes = useStyles()

  return (
    <div>
      <input
        accept="*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={fileUploadHandler}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          className={classes.button}
          aria-label="Upload picture"
          component="span"
        >
          <UploadFileIcon />
        </IconButton>
      </label>
    </div>
  )
}

export default CustomIconButton
