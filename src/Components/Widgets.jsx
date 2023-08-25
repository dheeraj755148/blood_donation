import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const Widjets = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My Line Chart',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        type: 'category', // This specifies that the x-axis is a category scale
        labels: data.labels, // Use the same labels as in your data
      },
    },
  }

  return (
    <div style={{ backgroundColor: '#25BAFF', padding: '20px' }}>
      <Line data={data} options={options} />
    </div>
  )
}

export default Widjets
