import { useContext, useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

export default function EditProfileModal({
  isOpen,
  onClose,
  onProfileSubmit,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      setValues({ name: currentUser.name, avatar: currentUser.avatar });
    }
  }, [isOpen, currentUser, setValues]);

  function handleProfileSubmit(e) {
    e.preventDefault();
    onProfileSubmit(values);
  }

  return (
    <ModalWithForm
      buttonText={isLoading ? "Saving..." : "Save changes"}
      title="Change Profile Data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleProfileSubmit}
      className="modal__save-button"
    >
      <label className="modal__label">
        Name *{" "}
        <input
          required
          value={values.name}
          name="name"
          autoComplete="off"
          type="text"
          className="modal__input"
          id="modal-name"
          placeholder="Enter your name"
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar *{" "}
        <input
          required
          value={values.avatar}
          autoComplete="off"
          type="url"
          className="modal__input"
          id="modal-avatar"
          name="avatar"
          placeholder="Enter avatar URL"
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
