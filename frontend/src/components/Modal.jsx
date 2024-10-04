import { FaPlus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export function Modal({ children, tooltip }) {
  return (
    <>
      <div className="fixed bottom-4 right-24">
        <div className="relative">
          <div
            className="tooltip absolute bottom-full mb-2 [--tooltip-tail:9px] "
            data-tip={tooltip}
          >
            <button
              className="btn btn-circle btn-lg btn-secondary text-3xl"
              onClick={() => document.getElementById('modal').showModal()}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box px-10">
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-3xl absolute right-2 top-2">
                <IoClose />
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
