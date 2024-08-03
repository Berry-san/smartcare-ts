import React, { ReactNode, MouseEvent } from 'react'

interface ModalProps {
  isVisible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'backdrop') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center m-0 bg-black bg-opacity-25 backdrop-blur-sm"
      id="backdrop"
      onClick={handleClose}
    >
      <div className="relative flex flex-col max-w-2xl p-4 mx-3 space-y-4 bg-white rounded">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          {/* <span className="sr-only">Close modal</span> */}
        </button>
        <div className="p-4 text-black scroll-black">{children}</div>
      </div>
    </div>
  )
}

export default Modal
