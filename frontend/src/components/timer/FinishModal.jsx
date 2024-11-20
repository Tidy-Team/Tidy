//Icons
import { IoClose } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'

export function FinishModal({ children, showFinishModal }) {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <>
      <dialog
        id="finish-modal"
        className={`modal modal-bottom sm:modal-middle   ${
          showFinishModal ? 'modal-open' : ''
        }`}
      >
        <div className="modal-box px-10">{children}</div>
      </dialog>
    </>
  )
}
