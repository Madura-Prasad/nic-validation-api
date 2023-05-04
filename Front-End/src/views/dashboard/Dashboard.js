import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
} from '@coreui/react-chartjs'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'

const Charts = () => {
  const random = () => Math.round(Math.random() * 100)

  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filterText, setFilterText] = useState('')
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          (user.id && user.id.toString().includes(filterText.toLowerCase())) ||
          (user.full_name && user.full_name.toLowerCase().includes(filterText.toLowerCase())) ||
          (user.mobile && user.mobile.toLowerCase().includes(filterText.toLowerCase())) ||
          (user.nationality && user.nationality.toLowerCase().includes(filterText.toLowerCase())) ||
          (user.address && user.address.toLowerCase().includes(filterText.toLowerCase())) ||
          (user.nic && user.nic.toLowerCase().includes(filterText.toLowerCase())) ||
          (user.age && user.age.toString().includes(filterText.toLowerCase())) ||
          (user.birthday && user.birthday.toLowerCase().includes(filterText.toLowerCase())) ||
          (user.gender && user.gender.toLowerCase().includes(filterText.toLowerCase())),
      ),
    )
  }, [filterText, users])

  const loadUsers = async () => {
    const result = await axios.get('http://localhost:8070/api/v1/getUser')
    const usersWithIds = result.data.data.map((user, index) => {
      return { ...user, id: index + 1 }
    })
    setUsers(usersWithIds)
  }

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

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle)
      setFilterText('')
    }
  }

  return (
    <CRow>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Mobile Number Provider Chart</CCardHeader>
          <CCardBody>
            <CChartBar
              data={{
                labels: ['Hutch', 'Airtel', 'Dialog', 'Mobitel'],
                datasets: [
                  {
                    label: 'Mobile Numbers',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 30],
                  },
                ],
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Age Chart</CCardHeader>
          <CCardBody>
            <CChartLine
              data={{
                labels: ['0-20', '40-60', '60-80'],
                datasets: [
                  {
                    label: 'Age',
                    backgroundColor: '#DD1B16',
                    borderColor: '#DD1B16',
                    pointBackgroundColor: '#00000',
                    pointBorderColor: '#fff',
                    data: [random(), random(), random()],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Gender Chart</CCardHeader>
          <CCardBody>
            <CChartDoughnut
              data={{
                labels: ['Male', 'Female'],
                datasets: [
                  {
                    backgroundColor: ['#41B883', '#E46651'],
                    data: [40, 20],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>NIC New or Old Chart</CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: ['New NIC', 'Old NIC'],
                datasets: [
                  {
                    data: [300, 50],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={6}>
        <CCard className="mb-4">
          <CCardHeader>Birth Year Chart</CCardHeader>
          <CCardBody>
            <CChartPolarArea
              data={{
                labels: ['1960-1980', '1970-1980', '1980-1990', '1990-2000'],
                datasets: [
                  {
                    data: [60, 45, 30, 15],
                    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <h4 className="card-title mb-0">Users Details</h4>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={filteredUsers}
              highlightOnHover={true}
              striped={true}
              dense={true}
              pagination
              paginationResetDefaultPage={resetPaginationToggle}
              subHeader
              subHeaderComponent={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Search Here"
                    className="form-control"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                  {filterText && (
                    <button
                      className="btn btn-outline-danger fw-bold my-2 mx-2"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  )}
                </div>
              }
              noDataComponent={<div className="text-center">No users found</div>}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Charts
