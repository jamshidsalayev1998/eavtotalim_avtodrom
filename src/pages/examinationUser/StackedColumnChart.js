import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class StackedColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const series = [
      {
        name: "O'tganlar",
        data: this.props?.data?.count_statuses?.by_month?.successeds,
      },
      {
        name: "Qaytganlar",
        data: this.props?.data?.count_statuses?.by_month?.returneds,
      },
    ];

    const options = {
      chart: {
        stacked: !0,
        toolbar: {
          show: 1,
        },
        zoom: {
          enabled: !0,
        },
      },
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "15%",
        },
      },
      dataLabels: {
        enabled: !1,
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
          "Dec",
        ],
        labels: {
          show: true,
        },
      },
      colors: ["#73d13d", "#ff4d4f"],
      legend: {
        position: "bottom",
      },
      fill: {
        opacity: 1,
      },
    };
    return (
      <>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height="245"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            marginTop: -15,
          }}
        >
          <p className="small-title">
            {this.props?.data?.count_statuses?.succesed_count} ta
          </p>
          <p className="small-title">
            {this.props?.data?.count_statuses?.returned_count} ta
          </p>
        </div>
      </>
    );
  }
}

export default StackedColumnChart;
