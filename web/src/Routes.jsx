import {
  Routes, Route
} from 'react-router-dom'
import { useContext } from 'react'

import { Context } from './contexts/AuthContext'

import Auth from './components/Auth'
import Register from './components/Register'

import DashboardHome from './components/Dashboard/Home'
import CreateBook from './components/Dashboard/CreateBook'
import Profile from './components/Dashboard/Profile'
import BookDetails from './components/Dashboard/BookDetails'
import NotFound from './components/404'

const Private = ({ children }) => {
  const { user } = useContext(Context)

  if (!user) {
    return <Auth />
  }

  return children
}

export default () => {
  return (
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={
        <Private>
          <DashboardHome />
        </Private>
      } />
      <Route path='/dashboard/profile' element={
        <Private>
          <Profile />
        </Private>
      } />
      <Route path='/dashboard/createbook' element={
        <Private>
          <CreateBook />
        </Private>
      } />
      <Route path='/dashboard/books/:id' element={
        <Private>
          <BookDetails />
        </Private>
      } />
      <Route path='*' element={<NotFound title={'Page not Found'} />} />
    </Routes>
  )
}
