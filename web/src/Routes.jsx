import {
  Routes, Route
} from 'react-router-dom'

import Auth from './components/Auth'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

import PrivateRoute from './components/Utils/PrivateRoute'

export default props => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/profile' element={<Dashboard />} />
        <Route path='/dashboard/createbook' element={<Dashboard />} />
        <Route path='/dashboard/logout' element={<Dashboard />} />
      </Route>
      <Route path='*' element={<Auth />} />
    </Routes>
  )
}