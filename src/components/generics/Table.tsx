import React from 'react'

interface Props {
  children: React.ReactNode
  headers: string[]
  darkMode?: boolean
}
const Table = ({ headers, children, darkMode }: Props) => {
  return (
    <table className={`table table-hover table-striped rounded ${darkMode ? 'table-dark' : ''}`}>
      <thead>
        <tr>
          {
            headers.map((header, index) => (
              <th key={index} scope="col" className={`${index === 0 ? 'top-left-radius': ''} ${index === (headers.length - 1) ? 'top-right-radius': ''}`}>
                <span className={'d-flex justify-content-center col-12'}>
                  {header}
                </span>
              </th>
            ))
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