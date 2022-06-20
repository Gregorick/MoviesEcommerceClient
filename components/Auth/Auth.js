import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

export default function Auth({ closeModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true);

  const showLoginForm = () => {
    setShowLogin(true);
    setTitleModal("Iniciar Sesión");
  };
  const showRegisterForm = () => {
    setShowLogin(false);
    setTitleModal("Registrarse");
  };

  return (
    <div className="auth">
      {showLogin ? (
        <LoginForm
          showRegisterForm={showRegisterForm}
          closeModal={closeModal}
        />
      ) : (
        <RegisterForm showLoginForm={showLoginForm} />
      )}
    </div>
  );
}
