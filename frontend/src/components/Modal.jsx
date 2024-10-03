import { FaPlus } from 'react-icons/fa';

export function Modal({ children }) {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-circle btn-lg   btn-secondary text-3xl fixed bottom-4 right-4"
        onClick={() => document.getElementById('modal').showModal()}
      >
        <FaPlus />
      </button>
      <dialog id="modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box pt-10">
          {children}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
