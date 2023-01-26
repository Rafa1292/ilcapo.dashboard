import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js'
import { ChartData } from '../../types/chart/chartData'
Chart.register(ArcElement, Tooltip, Title, Legend)

function PieChart({chartData}: {chartData: ChartData}) {
  return (
    <div className="chart-container">
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: 'right'
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