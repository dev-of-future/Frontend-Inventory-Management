'use client'
import React from 'react'

const ShowModalBtn = ({ text }: any) => {
  const handleOpenModal = () => {
    const modalID = document.getElementById('input-modal');
    modalID.showModal();
  }
  return (
    <>
      <button className="btn" onClick={handleOpenModal}>{text}</button>
    </>
  )
}

export default ShowModalBtn