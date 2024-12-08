import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";

const LoginModal = ({
  onClose,
  onLogin,
  handleRegisterRoute,
  isOpen,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="Login"
      buttonText="Submit"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      redirectButton={
        <button
          type="button"
          onClick={handleRegisterRoute}
          className="modal__redirect-btn"
        >
          Or Sign Up
        </button>
      }
    >
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="current-password"
          placeholder="Password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
