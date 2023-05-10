import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
} from '@coreui/react-chartjs'
import axios from 'axios'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])
  const [resetPaginationToggle] = useState(false)

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8070/api/v1/filter')
    setData(response.data)
    setFilteredData(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      name: 'Full Name',
      selector: 'full_name',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Age',
      selector: 'age',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Birthday',
      selector: 'birthday',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Gender',
      selector: 'gender',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Mobile Number',
      selector: 'mobile',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Address',
      selector: 'address',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Nationality',
      selector: 'nationality',
      sortable: true,
      width: '150px',
    },
    {
      name: 'NIC',
      selector: 'nic',
      sortable: true,
      width: '150px',
    },
  ]

  const handleAgeFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = data.filter((item) => item.age && item.age.toString().includes(searchTerm))
    setFilteredData(filtered)
  }

  const handleGenderFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = data.filter(
      (item) => item.gender && item.gender.toString().toLowerCase().includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  const handleNameFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = data.filter(
      (item) => item.full_name && item.full_name.toLowerCase().includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  const handleMobileFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = data.filter(
      (item) => item.mobile && item.mobile.toLowerCase().includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  const handleAddressFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = data.filter(
      (item) => item.address && item.address.toLowerCase().includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  const handleNationalityFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const filtered = data.filter(
      (item) => item.nationality && item.nationality.toLowerCase().includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  const chart = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Age',
        backgroundColor: '#2C3333',
        borderColor: '#2C3333',
        borderWidth: 1,
        hoverBackgroundColor: '#2C3333',
        hoverBorderColor: '#2C3333',
        data: chartData,
      },
    ],
  }

  useEffect(() => {
    const ages = filteredData.map((item) => item.age)
    const bins = [0, 20, 30, 40, 50, 60]
    const labels = bins.map((bin, i) => {
      const label = i === bins.length - 1 ? `${bins[i - 1]}+` : `${bin}-${bins[i + 1] - 1}`
      return label
    })
    const data = labels.map((label, i) => {
      const lowerBound = bins[i]
      const upperBound = i === bins.length - 1 ? Infinity : bins[i + 1] - 1
      const count = ages.filter((age) => age >= lowerBound && age <= upperBound).length
      return count
    })
    setChartLabels(labels)
    setChartData(data)
  }, [filteredData])

  return (
    <CRow>
      <CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              <input
                type="text"
                placeholder="Search by Name"
                onChange={handleNameFilter}
                style={{
                  marginRight: '20px',
                  borderColor: 'black',
                  borderRadius: '7.5px',
                  textAlign: 'center',
                }}
              />
              <input
                type="text"
                placeholder="Search by Age"
                onChange={handleAgeFilter}
                style={{
                  marginRight: '20px',
                  borderColor: 'black',
                  borderRadius: '7.5px',
                  textAlign: 'center',
                }}
              />
              <input
                type="text"
                placeholder="Search by Gender"
                onChange={handleGenderFilter}
                style={{
                  marginRight: '20px',
                  borderColor: 'black',
                  borderRadius: '7.5px',
                  textAlign: 'center',
                }}
              />
              <input
                type="text"
                placeholder="Search by Mobile"
                onChange={handleMobileFilter}
                style={{
                  marginRight: '20px',
                  borderColor: 'black',
                  borderRadius: '7.5px',
                  textAlign: 'center',
                }}
              />
              <input
                type="text"
                placeholder="Search by Address"
                onChange={handleAddressFilter}
                style={{
                  marginRight: '20px',
                  borderColor: 'black',
                  borderRadius: '7.5px',
                  textAlign: 'center',
                }}
              />
              <input
                type="text"
                placeholder="Search by Nationality"
                onChange={handleNationalityFilter}
                style={{
                  marginRight: '20px',
                  borderColor: 'black',
                  borderRadius: '7.5px',
                  textAlign: 'center',
                }}
              />
            </CCardHeader>
          </CCard>
        </CCol>

        <CRow>
          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Age Range</CCardHeader>
              <CCardBody>
                <CChartBar data={chart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Age Range</CCardHeader>
              <CCardBody>
                <CChartLine data={chart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Age Range</CCardHeader>
              <CCardBody>
                <CChartDoughnut data={chart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Age Range</CCardHeader>
              <CCardBody>
                <CChartPie data={chart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Age Range</CCardHeader>
              <CCardBody>
                <CChartPolarArea data={chart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>User Details</CCardHeader>

              <CCardBody>
                <DataTable
                  columns={columns}
                  data={filteredData}
                  highlightOnHover={true}
                  striped={true}
                  dense={true}
                  pagination
                  paginationResetDefaultPage={resetPaginationToggle}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default Dashboard
