import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Link } from 'react-router-dom'

const UsersTable = () => {
  const [user, setUsers] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8070/api/v1/getUser')
    setUsers(result.data.data)
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8070/api/v1/deleteUser/${id}`)
    loadUsers()
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
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Link
            to={`/users/updateData/UpdateField/${row.id}`}
            className="mx-1 text-warning text-decoration-none fw-bold"
          >
            Edit
          </Link>
          <button
            className="mx-1 text-danger bg-transparent border-0 text-decoration-underline fw-bold"
            onClick={() => deleteUser(row.id)}
          >
            Delete
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]

  return (
    <CRow>
      <CCol xs={12} className="mt-5">
        <CCard className="mb-4 container">
          <CCardHeader>
            <h2 className="fw-bold">Update Users</h2>
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
