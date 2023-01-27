import React from 'react'
import LineChart from '../charts/LineChart'
import PieChart from '../charts/PieChart'
import BarChart from '../charts/BarChart'
import { ChartData } from '../../types/chart/chartData'

const Resume = () => {

  const sales: ChartData = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
    title: 'Ventas diarias',
    datasets: [
      {
        label: 'Ventas actuales',
        data: [20000, 38000, 55000, 82000, 145000, 210000],
        backgroundColor: ['darkred'],
        borderColor: 'darkred',
        borderWidth: 4,
        tension: 0.4
      },
      {
        label: 'Meta',
        data: [20000, 40000, 60000, 60000, 150000, 225000, 250000],
        backgroundColor: ['darkblue'],
        borderColor: 'darkblue',
        borderWidth: 4,
        tension: 0.4
      },
    ]
  }
  const yearGoals: ChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    title: 'Ventas mensuales',
    datasets: [
      {
        label: 'Ventas actuales',
        data: [4100000, 3850000, 5500000, 6200000],
        backgroundColor: ['darkred'],
        borderColor: 'darkred',
        borderWidth: 4,
        tension: 0.4
      },
      {
        label: 'Meta',
        data: [4000000, 4400000, 6000000, 6000000, 5000000, 5200000, 4400000, 4900000, 5000000, 5500000, 6000000, 7000000],
        backgroundColor: ['darkblue'],
        borderColor: 'darkblue',
        borderWidth: 4,
        tension: 0.4
      },
    ]
  }
  const bestSeller: ChartData = {
    labels: ['jamon y queso', 'pepperoni', 'hawaiana', 'vegetariana', 'pollo', 'mexicana'],
    title: 'Productos más vendidos',
    datasets: [
      {
        label: 'Ventas actuales',
        data: [60, 58, 44, 32, 25, 25],
        backgroundColor: ['rgba(150,0,0,1)', 'rgba(150,0,0,.8)', 'rgba(150,0,0,.6)', 'rgba(150,0,0,.5)',
          'rgba(150,0,0,.4)', 'rgba(150,0,0,.3)'],
        borderColor: 'white',
        borderWidth: 1,
        tension: 0.4
      }
    ]
  }
  const moreProfit: ChartData = {
    labels: ['jamon y queso', 'alitas de pollo', 'pasta alfredo', 'vegetariana', 'pollo', 'mexicana'],
    title: 'Productos más rentables',
    datasets: [
      {
        label: 'Ventas actuales',
        data: [480000, 300000, 280000, 240000, 200000, 120000],
        backgroundColor: ['rgba(0,0,150,1)', 'rgba(0,0,150,.8)', 'rgba(0,0,150,.6)', 'rgba(0,0,150,.5)',
          'rgba(0,0,150,.4)', 'rgba(0,0,150,.3)'],
        borderColor: 'white',
        borderWidth: 1,
        tension: 0.4
      }
    ]
  }
  return (
    < >
      <h2 className='col-12 text-center'>Semana #24</h2>
      <div className="col-lg-12 d-flex shadow rounded p-4 justify-content-center my-4">
        <LineChart chartData={sales} />
      </div>
      <div className="col-lg-5 d-flex shadow-right rounded justify-content-center my-4">
        <PieChart chartData={bestSeller} />
      </div>
      <div className="col-lg-5 d-flex shadow-right rounded justify-content-center my-4">
        <PieChart chartData={moreProfit} />
      </div>
    </>
  )
}

export default Resume