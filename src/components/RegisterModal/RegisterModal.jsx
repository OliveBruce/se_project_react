import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";

const RegisterModal = ({
  onClose,
  handleRegister,
  handleLoginRoute,
  isOpen,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="Register user"
      buttonText="Submit"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      redirectButton={
        <button
          type="button"
          onClick={handleLoginRoute}
          className="modal__redirect-btn"
        >
          Or Login
        </button>
      }
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="new-password"
          placeholder="Password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="user-name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
