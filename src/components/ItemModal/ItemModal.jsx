import "./ItemModal.css";
import close from "../../assets/close.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, confirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwner ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close-btn" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__description">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwner ? (
            <button
              type="button"
              className={itemDeleteButtonClassName}
              onClick={confirmationModal}
            >
              Delete Item
            </button>
          ) : (
            <p className="modal__no-permission">You cannot delete this item.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
