import React from 'react'
import Table from '../components/generics/Table'
import TableRow from '../components/generics/TableRow'



const Providers = () => {
  return (
    <>
      <h1>Providers</h1>
      <Table headers={['#', 'first', 'last', 'handle','']} darkMode={true}>
        <TableRow tableData={['1', 'juan', 'Rafael', 'Villalobos']}>
          <button className="btn btn-success">Edit</button>
        </TableRow>
      </Table>
    </>
  )
}

export default Providers