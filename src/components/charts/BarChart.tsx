import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { ChartData } from '../../types/chart/chartData'
Chart.register(ArcElement, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement)

function PieChart({chartData}: {chartData: ChartData}) {
  return (
    <div className="chart-container col-md-8">
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: chartData.title
            }
          }
        }}
      />
    </div>
  )
}
export default PieChart