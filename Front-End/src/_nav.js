import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPen, cilPlus, cilSpeedometer, cilUser, cilViewQuilt } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: '',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Manage Users',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Users',
        to: '/users/add',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Update Users',
        to: '/users/update',
        icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'View Users',
        to: '/users/view',
        icon: <CIcon icon={cilViewQuilt} customClassName="nav-icon" />,
      },
    ],
  },
]

export default _nav
