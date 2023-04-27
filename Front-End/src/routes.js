import React from 'react'

// Base
const Add = React.lazy(() => import('./views/users/add/Add'))
const Update = React.lazy(() => import('./views/users/update/Update'))
const View = React.lazy(() => import('./views/users/view/View'))
const UpdateField = React.lazy(() => import('./views/users/updateData/UpdateField'))

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/users', name: 'Base', element: View, exact: true },
  { path: '/users/add', name: 'Add', element: Add },
  { path: '/users/update', name: 'Update', element: Update },
  { path: '/users/view', name: 'View', element: View },
  { path: '/users/updateData/UpdateField/:id', name: 'UpdateField', element: UpdateField },
]

export default routes
