'use client'
import React from 'react'

const ShowModalBtn = ({ text, id, style }: any) => {
  const handleOpenModal = () => {
    const modalID = document.getElementById(id);
    modalID.showModal();
  }
  return (
    <>
      <button className={`btn ${style}`} onClick={handleOpenModal}>{text}</button>
    </>
  )
}

export default ShowModalBtn