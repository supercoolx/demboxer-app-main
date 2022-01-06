import React from 'react'
import PropTypes from 'prop-types'
export const AlertContext = React.createContext()
const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = React.useState({
    successSnackbarOpen: false,
    successSnackbarMessage: '',
    errorSnackbarOpen: false,
    errorSnackbarMessage: '',
    infoSnackbarOpen: false,
    infoSnackbarMessage: ''
  })
  const storeAlert = alert => {
    setAlert(alert)
  }
  return <AlertContext.Provider value={{ alert, storeAlert }}>{children}</AlertContext.Provider>
}
AlertContextProvider.propTypes = {
  children: PropTypes.object,
}
export default AlertContextProvider
export const useAlert = () => React.useContext(AlertContext)
