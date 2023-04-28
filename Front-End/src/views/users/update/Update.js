import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Link } from 'react-router-dom'

const Update = () => {
  const [users, setUsers] = useState(null)

  //const {id} = useParams();

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8070/api/v1/getUser')
    setUsers(result.data)
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8070/api/v1/deleteUser/${id}`)
    loadUsers()
  }

  return (
    <CRow>
      <CCol xs={12} className="mt-5">
        <CCard className="mb-4 container">
          <CCardHeader>
            <h2 className="fw-bold">Update Users</h2>
          </CCardHeader>
          <CCardBody className="p-5 table-responsive">
            <CTable hover className="table">
              <CTableHead className="table-dark text-light shadow">
                <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nationality</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">NIC</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users &&
                  users.data.map((user, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <CTableRow className="fw-bold">
                      <CTableHeaderCell className="p-3" key={index}>
                        {index + 1}
                      </CTableHeaderCell>
                      <CTableDataCell className="p-3">{user.full_name}</CTableDataCell>
                      <CTableDataCell className="p-3">{user.mobile}</CTableDataCell>
                      <CTableDataCell className="p-3">{user.nationality}</CTableDataCell>
                      <CTableDataCell className="p-3">{user.address}</CTableDataCell>
                      <CTableDataCell className="p-3">{user.nic}</CTableDataCell>
                      <Link
                        to={`/users/updateData/UpdateField/${user.id}`}
                        className="btn btn-outline-warning fw-bold my-2 mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger fw-bold my-2 mx-2"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Update
