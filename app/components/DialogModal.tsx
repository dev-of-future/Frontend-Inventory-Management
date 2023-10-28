import React, { Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";

const DialogModal = ({ children, toggleModal, handleSubmit, header, open, style = '' }: any) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-10 overflow-y-auto ${style}`}
        onClose={toggleModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-md" >
              <Dialog.Panel>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  {header}
                </Dialog.Title>
                <div className="max-w-md max-auto">
                  <div>
                    {children}
                    <div className="mt-6 space-x-4">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-secondary">
                        Submit
                      </button>
                      <button
                        onClick={toggleModal}
                        className="btn btn-error">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition >
  )
}

export default DialogModal