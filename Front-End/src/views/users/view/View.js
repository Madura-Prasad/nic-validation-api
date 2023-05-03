import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const UsersTable = () => {
  const [user, setUser] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8070/api/v1/getUser')
    const usersWithIds = result.data.data.map((user, index) => {
      return { ...user, id: index + 1 }
    })
    setUser(usersWithIds)
  }

  const filteredUsers = user.filter((user) =>
    user.full_name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'full_name',
      sortable: true,
    },
    {
      name: 'Mobile',
      selector: 'mobile',
      sortable: true,
    },
    {
      name: 'Nationality',
      selector: 'nationality',
      sortable: true,
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
    },
    {
      name: 'NIC',
      selector: 'nic',
      sortable: true,
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
    },
    {
      name: 'Birthday',
      selector: 'birthday',
      sortable: true,
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
    },
  ]

  return (
    <CRow>
      <CCol xs={12} className="mt-5">
        <CCard className="mb-4 container">
          <CCardHeader>
            <h2 className="fw-bold">View Users</h2>
          </CCardHeader>
          <CCardBody className="py-5 table-responsive">
            <div className="mb-5">
              <input
                className=" float-end"
                type="text"
                placeholder="Search Name"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <DataTable
              className="table"
              columns={columns}
              data={filteredUsers}
              pagination={true}
              highlightOnHover={true}
              striped={true}
              dense={true}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UsersTable
