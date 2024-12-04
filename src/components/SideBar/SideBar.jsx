import React from "react";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          type="button"
          className="sidebar__change-profile"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button onClick={onSignOut} className="sidebar__logout">
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
