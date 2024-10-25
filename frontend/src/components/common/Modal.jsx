//Icons
import { FaPlus } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export function Modal({ children, tooltip }) {
  return (
    <>
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
