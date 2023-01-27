import React from 'react'

interface Props {
  tableData: string[]
  children?: React.ReactNode
}

const TableRow = ({ tableData, children }: Props) => {
  return (
    <tr>
      {
        tableData.map((data, index) => <td key={index}>{data}</td>)
      }
      {
        children && 
        <td className='d-flex justify-content-around'>
          {children}
        </td>
      }
    </tr>
  )
}

export default TableRow