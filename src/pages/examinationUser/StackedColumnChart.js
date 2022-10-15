import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class StackedColumnChart extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {}
    console.log('jjj',props)
  }

  render() {
    const series = [
      {
        name: "O'tganlar",
        data: this.props?.data?.count_statuses?.by_month?.successeds
      },
      {
        name: "Qaytganlar",
        data: this.props?.data?.count_statuses?.by_month?.returneds
      }
    ]

    const options = {
      chart: {
        stacked: !0,
        toolbar: {
          show: 1
        },
        zoom: {
          enabled: !0
        }
      },
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "15%"
          // endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: !1
      },
      xaxis: {
        show: true,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        labels: {
          show: true
        }
      },
      colors: ["#73d13d", "#ff4d4f"],
      legend: {
        position: "bottom"
      },
      fill: {
        opacity: 1
      }
    }
    return (
      <React.Fragment>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="359"
        />
      </React.Fragment>
    )
  }
}

export default StackedColumnChart
