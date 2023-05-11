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
    const birthday = filteredData.map((item) => parseInt(item.birthday.substring(0, 4)))
    const bins = [1960, 1970, 1980, 1990, 2000]
    const labels = bins.map((bin, i) => {
      return i < bins.length - 1 ? `${bin}-${bins[i + 1] - 1}` : `${bin}+`
    })

    const data = labels.map((label, i) => {
      const lowerBound = bins[i]
      const upperBound = i === bins.length - 1 ? Infinity : bins[i + 1]
      const count = birthday.filter((year) => {
        return year >= lowerBound && year < upperBound
      }).length
      return count
    })

    setLineChartLabels(labels)
    setLineChartData(data)
  }, [filteredData])

  //Pie Chart for Mobile Number
  const pieChart = {
    labels: polarChartLabels,
    datasets: [
      {
        label: 'Mobile Numbers Count',
        backgroundColor: ['#FF0094', '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED'],
        data: polarChartData,
      },
    ],
  }

  useEffect(() => {
    if (!filteredData || filteredData.length === 0) {
      // If filteredData is empty or undefined, reset the chart data and labels
      setPolarChartLabels([])
      setPolarChartData([])
      return
    }

    const gender = filteredData.map((item) => item.mobile)
    const bins = ['070', '071', '075', '077', '078'] // Sort the bins in ascending order
    const labels = bins.map((bin) => bin)

    const data = labels.map((label, i) => {
      const lowerBound = parseInt(bins[i])
      const upperBound = i === bins.length - 1 ? Infinity : parseInt(bins[i + 1]) - 1
      const count = gender.filter((mobile) => {
        const mobileNumber = parseInt(mobile.substring(0, 3))
        return mobileNumber >= lowerBound && mobileNumber <= upperBound
      }).length
      return count
    })

    setPolarChartLabels(labels)
    setPolarChartData(data)
  }, [filteredData])

  //Doughnut Chart for Gender
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
    const genders = filteredData.map((item) => item.gender)
    const bins = ['Male', 'Female']
    const labels = bins.map((bin) => bin)

    const data = labels.map((label, i) => {
      const lowerBound = i === 0 ? 0 : bins[i - 1] + 1
      const upperBound = bins[i]

      const count = genders.filter((gender) => gender >= lowerBound && gender <= upperBound).length
      return count
    })

    setDoughnutChartLabels(labels)
    setDoughnutChartData(data)
  }, [filteredData])

  //Polar Chart for NIC
  const polarChart = {
    labels: pieChartLabels,
    datasets: [
      {
        label: 'NIC New or Old Count',
        backgroundColor: ['#41B883', '#E46651'],
        data: pieChartData,
      },
    ],
  }

  useEffect(() => {
    const oldNIC = filteredData.filter((item) => {
      return item.nic.length === 10 // old NICs have a length of 10
    })
    const newNIC = filteredData.filter((item) => {
      return item.nic.length === 12 // new NICs have a length of 12
    })
    const labels = ['Old NIC', 'New NIC']
    const data = [oldNIC.length, newNIC.length]
    setPieChartLabels(labels)
    setPieChartData(data)
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
              <CCardHeader> Mobile Number Provider Pie Chart</CCardHeader>
              <CCardBody>
                <CChartPie data={pieChart} />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={6}>
            <CCard className="mb-4 mt-4">
              <CCardHeader>NIC New or Old Polar Chart</CCardHeader>
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
