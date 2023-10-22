import React, { useEffect } from 'react'

const Supplier = ({ params }: { params: { id: string } }) => {
  // useEffect(() => { }, []);
  return (
    <div>Supplier: {params.id}</div>
  )
}

export default Supplier