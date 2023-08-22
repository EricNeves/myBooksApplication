import {
  Outlet, Navigate
} from 'react-router-dom'

export default function PrivateRoute() {
  const auth = { token: false }

  return (
    auth ? <Outlet /> : <Navigate to={'/'} />
  )
}