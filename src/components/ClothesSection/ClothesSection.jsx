import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function ClothesSection({
  handleCardClick,
  clothingItems,
  handleAddClick,
  isLoggedIn,
  handleCardLike,
  isLiked,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item?.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__description">Your items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item?._id}
              item={item}
              handleCardClick={handleCardClick}
              isLoggedIn={isLoggedIn}
              handleCardLike={handleCardLike}
              isLiked={isLiked}
            />
          ))
        ) : (
          <p>No items found</p>
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
