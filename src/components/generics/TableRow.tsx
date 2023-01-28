import React from 'react'

interface Props {
  tableData: string[]
  children?: React.ReactNode
}

const TableRow = ({ tableData, children }: Props) => {
  return (
    <tr>
      {
        tableData.map((data, index) => <td className='' key={index}>{data}</td>)
      }
      {
        children && 
        <td className=''>
          {children}
        </td>
      }
    </tr>
  )
}

export default TableRow