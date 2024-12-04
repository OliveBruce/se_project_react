import "./ItemModal.css";
import close from "../../assets/close.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, confirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const { name, imageUrl, weather, owner } = card || {};
  const isOwner = currentUser && currentUser?._id === card?.owner;
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwner ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close-btn" />
        </button>
        <img src={imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__description">
            <h2 className="modal__caption">{name}</h2>
            <p className="modal__weather">Weather: {weather}</p>
          </div>
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={confirmationModal}
          >
            Delete Item
          </button>
          {!isOwner && (
            <p className="modal__no-permission">You cannot delete this item.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
