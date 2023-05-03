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
                labels: ['1940-1960', '1960-1980', '1980-2000', '2000-2020'],
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
      <CCol xs={12} className="mt-5">
        <CCard className="mb-4 container">
          <CCardHeader>
            <h2 className="fw-bold">Users Details</h2>
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

export default Charts
