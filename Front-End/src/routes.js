import React from 'react'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// Users
const Add = React.lazy(() => import('./views/users/add/Add'))
const Update = React.lazy(() => import('./views/users/update/Update'))
const View = React.lazy(() => import('./views/users/view/View'))
const UpdateField = React.lazy(() => import('./views/users/updateData/UpdateField'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users', name: ' Manage Users', element: View, exact: true },
  { path: '/users/add', name: 'Add Users', element: Add },
  { path: '/users/update', name: 'Update Users', element: Update },
  { path: '/users/view', name: 'View Users', element: View },
  { path: '/users/updateData/UpdateField/:id', name: 'Edit User', element: UpdateField },
]

export default routes
