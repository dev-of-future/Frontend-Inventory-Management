import React from 'react'

const CreateModal = ({ children }: any) => {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className='modal-backdrop'>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle absolute right-2 top-2">X</button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  )
}

export default CreateModal