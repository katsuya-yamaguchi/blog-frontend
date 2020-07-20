import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import SampleCalendar from "./components/SampleCalendar";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      width: '60%',
      margin: 'auto auto'
    }
  })
)

const App: React.FC = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SampleCalendar />
    </div>
  )
}

export default App
