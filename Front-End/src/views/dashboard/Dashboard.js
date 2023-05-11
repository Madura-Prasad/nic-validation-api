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
  const [barChartData, setBarChartData] = useState([])
  const [barChartLabels, setBarChartLabels] = useState([])
  const [lineChartData, setLineChartData] = useState([])
  const [lineChartLabels, setLineChartLabels] = useState([])
  const [doughnutChartData, setDoughnutChartData] = useState([])
  const [doughnutChartLabels, setDoughnutChartLabels] = useState([])
  const [polarChartData, setPolarChartData] = useState([])
  const [polarChartLabels, setPolarChartLabels] = useState([])

  const [pieChartData, setPieChartData] = useState([])
  const [pieChartLabels, setPieChartLabels] = useState([])

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

  //Bar Chart for Ages
  const barChart = {
    labels: barChartLabels,
    datasets: [
      {
        label: 'Ages Count',
        backgroundColor: '#1B2430',
        borderColor: '#EEEEEE',
        borderWidth: 2,
        hoverBackgroundColor: '#51557E',
        hoverBorderColor: '#EEEEEE',
        data: barChartData,
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
    setBarChartLabels(labels)
    setBarChartData(data)
  }, [filteredData])

  //Line Chart for Birth Year
  const lineChart = {
    labels: lineChartLabels,
    datasets: [
      {
        label: 'Birth Year Count',
        backgroundColor: '#1B2430',
        borderColor: '#EEEEEE',
        borderWidth: 2,
        hoverBackgroundColor: '#51557E',
        hoverBorderColor: '#EEEEEE',
        data: lineChartData,
      },
    ],
  }

  useEffect(() => {
    const birthday = filteredData.map((item) => item.birthday)
    const bins = ['1960-1970', '1970-1980', '1980-1990', '1990-2000']
    const labels = bins.map((bin) => bin)

    const data = labels.map((label, i) => {
      const lowerBound = i === 0 ? 1960 : 1970
      const upperBound = i === bins.length - 1 ? Infinity : 1980
      const count = birthday.filter((birthday) => {
        return birthday >= lowerBound && birthday < upperBound
      }).length
      return count
    })

    setLineChartLabels(labels)
    setLineChartData(data)
  }, [filteredData])

  //Pie Chart for NIC
  const pieChart = {
    labels: pieChartLabels,
    datasets: [
      {
        label: 'Birth Year Count',
        backgroundColor: ['#41B883', '#E46651'],
        data: pieChartData,
      },
    ],
  }

  useEffect(() => {
    const birthday = filteredData.map((item) => item.nic)
    const bins = ['Old', 'New']
    const labels = bins.map((bin) => bin)

    const data = labels.map((label, i) => {
      const lowerBound = i === 0 ? 1960 : 1970
      const upperBound = i === bins.length - 1 ? Infinity : 1980
      const count = birthday.filter((birthday) => {
        return birthday >= lowerBound && birthday < upperBound
      }).length
      return count
    })

    setPieChartLabels(labels)
    setPieChartData(data)
  }, [filteredData])

  //Doughnut Chart for NIC
  const doughnutChart = {
    labels: doughnutChartLabels,
    datasets: [
      {
        label: 'Gender Count',
        backgroundColor: ['#41B883', '#E46651'],
        data: doughnutChartData,
      },
    ],
  }

  useEffect(() => {
    const gender = filteredData.map((item) => item.gender)
    const bins = ['Male', 'Female']
    const labels = bins.map((bin) => bin)

    const data = labels.map((label, i) => {
      const lowerBound = bins[i]
      const upperBound = i === bins.length - 1 ? Infinity : bins[i + 1] - 1
      const count = gender.filter((gender) => gender >= lowerBound && gender <= upperBound).length
      return count
    })
    setDoughnutChartLabels(labels)
    setDoughnutChartData(data)
  }, [filteredData])

  //Polar Chart for NIC
  const polarChart = {
    labels: polarChartLabels,
    datasets: [
      {
        label: 'Gender Count',
        backgroundColor: '#1B2430',
        borderColor: '#EEEEEE',
        borderWidth: 2,
        hoverBackgroundColor: '#51557E',
        hoverBorderColor: '#EEEEEE',
        data: polarChartData,
      },
    ],
  }

  useEffect(() => {
    const gender = filteredData.map((item) => item.mobile)
    const bins = ['078', '077']
    const labels = bins.map((bin) => bin)

    const data = labels.map((label, i) => {
      const lowerBound = bins[i]
      const upperBound = i === bins.length - 1 ? Infinity : bins[i + 1] - 1
      const count = gender.filter((gender) => gender >= lowerBound && gender <= upperBound).length
      return count
    })
    setPolarChartLabels(labels)
    setPolarChartData(data)
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
              <CCardHeader>Age Bar Chart</CCardHeader>
              <CCardBody>
                <CChartBar data={barChart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Birth Line Chart</CCardHeader>
              <CCardBody>
                <CChartLine data={lineChart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Gender Doughnut Chart</CCardHeader>
              <CCardBody>
                <CChartDoughnut data={doughnutChart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>NIC New or Old Pie Chart</CCardHeader>
              <CCardBody>
                <CChartPie data={pieChart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>Mobile Number Provider Polar Chart</CCardHeader>
              <CCardBody>
                <CChartPolarArea data={polarChart} />
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
