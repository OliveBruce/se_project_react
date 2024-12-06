import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const LoginModal = ({ onClose, onLogin, handleRegisterRoute, isOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }, resetForm);
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <ModalWithForm
      title="Login"
      buttonText="Submit"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="current-password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
