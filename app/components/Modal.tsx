import React from 'react'

const Modal = ({ children }: any) => {
  return (
    <>
      <dialog id="input-modal" className="modal">
        <div className="modal-box">
          <form method="dialog" className="modal-backdrop">
            {children}
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default Modal