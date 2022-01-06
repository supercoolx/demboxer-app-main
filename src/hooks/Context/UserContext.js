import React from 'react'
import PropTypes from 'prop-types'
export const UserContext = React.createContext()
const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    user_id: 0,
    email: '',
    name: '',
    dob: null,
    mobile_number: '',
    photo: ''
  })
  const storeUser = user => {
    setUser(user)
  }
  return <UserContext.Provider value={{ user, storeUser }}>{children}</UserContext.Provider>
}
UserContextProvider.propTypes = {
  children: PropTypes.object,
}
export default UserContextProvider
export const useUser = () => React.useContext(UserContext)
