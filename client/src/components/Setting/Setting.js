import React from 'react'
import useStyles from "./styles"
import Sidebar from "./Sidebar/Sidebar"

const Setting = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Sidebar />
    </div>
  )
}

export default Setting