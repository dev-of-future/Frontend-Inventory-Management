import React from 'react'

const Modal = ({ children }: any) => {
  return (
    <>
      <dialog id="crud-modal" className="modal">
        <div className="modal-box">
          <form method="dialog" className="modal-backdrop">
            {children}
            <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default Modal