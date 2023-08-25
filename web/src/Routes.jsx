import {
  Routes, Route, Navigate
} from 'react-router-dom'
import { useContext } from 'react' 

import Auth from './components/Auth'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { Context } from './contexts/AuthContext'

function PrivateRouter({ children }) {
  const { authenticated } = useContext(Context)
  const auth = true
  if (authenticated?.auth) {
    return children
  } else {
    return <Navigate to='/' />
  }
}

export default props => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={
        <PrivateRouter>
          <Dashboard />
        </PrivateRouter>
      } />
      <Route path='/dashboard/profile' element={<Dashboard />} />
      <Route path='/dashboard/createbook' element={<Dashboard />} />
      <Route path='/dashboard/logout' element={<Dashboard />} />
      <Route path='*' element={<Auth />} />
    </Routes>
  )
}