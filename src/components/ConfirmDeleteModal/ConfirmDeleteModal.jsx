import "./ConfirmDeleteModal.css";
import close from "../../assets/close.svg";

function ConfirmDeleteModal({ activeModal, onClose, card, handleCardDelete }) {
  const onCardDelete = () => {
    handleCardDelete(card);
  };

  return (
    <div
      className={`modal ${
        activeModal === "delete-confirmation" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_delete">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close-btn" />
        </button>
        <p className="modal__delete__header">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__delete__buttons">
          <button
            className="modal__delete__btn modal__delete__btn_type_delete"
            onClick={onCardDelete}
          >
            Yes, delete item
          </button>
          <button
            className="modal__delete__btn modal__delete__btn_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
