import {
  Routes, Route
} from 'react-router-dom'

import Auth from './components/Auth'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

export default props => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/profile' element={<Dashboard />} />
      <Route path='/dashboard/createbook' element={<Dashboard />} />
      <Route path='/dashboard/logout' element={<Dashboard />} />
      <Route path='*' element={<Auth />} />
    </Routes>
  )
}