import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (isLoggedIn === true) {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" alt="WTWR logo" src={logo} />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__user-container">
          <ToggleSwitch />
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__username">{currentUser?.name}</div>
            <img
              src={currentUser?.avatar}
              alt="avatar name"
              className="header__avatar"
            />
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__user-container">
          <ToggleSwitch />
        </div>
        <button onClick={handleRegisterClick} className="header__register">
          Register
        </button>
        <button onClick={handleLoginClick} className="header__login">
          Log In
        </button>
      </header>
    );
  }
}

export default Header;
