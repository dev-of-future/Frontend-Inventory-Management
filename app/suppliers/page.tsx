import React from 'react'
import Supplier from './Supplier'
import Modal from '../components/Modal'
import ShowModalBtn from '../components/ShowModalBtn'

const Page = () => {
  return (
    <>
      <Supplier />
      <Modal />
      <ShowModalBtn text="Create Supplier" />
    </>
  )
}

export default Page