import React from 'react'

interface Props {
  children: React.ReactNode
  headers: string[]
  darkMode?: boolean
}
const Table = ({headers, children, darkMode}: Props) => {
  return (
    <table className={`table table-hover table-striped rounded ${darkMode ? 'table-dark': ''}`}>
      <thead>
        <tr>
          {
            headers.map((header, index) => <th key={index} scope="col">{header}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

export default Table