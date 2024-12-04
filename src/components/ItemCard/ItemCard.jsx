import React from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import LikeImage from "..//../assets/LikeImage.svg";
import LikedImage from "../../assets/LikedImage.svg";

function ItemCard({ item, handleCardClick, isLoggedIn, handleCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLike = () => {
    handleCardLike({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn ? (
          <button onClick={handleLike} className="cards__like-wrapper">
            <img
              src={isLiked ? LikedImage : LikeImage}
              alt="like button"
              className="cards__like"
            />
          </button>
        ) : (
          ""
        )}
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
