import React from 'react'

const ShowModalBtn = ({ text, toggleModal, style }: any) => {
  return (
    <>
      <button className={`btn ${style}`} onClick={toggleModal}>{text}</button>
    </>
  )
}

export default ShowModalBtn