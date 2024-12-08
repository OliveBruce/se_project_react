import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/contants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getItems,
  addClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { setToken, getToken } from "../../utils/token";
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLoginRoute = () => {
    setActiveModal("login");
  };

  const handleRegisterRoute = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  const onProfileSubmit = ({ name, avatar }) => {
    function submitProfile() {
      const token = getToken();
      return auth.editProfile({ name, avatar }, token).then((res) => {
        setCurrentUser({ ...currentUser, ...res });
      });
    }
    handleSubmit(submitProfile);
  };

  const handleAddItem = (newItem) => {
    function addItem() {
      const name = newItem.name;
      const imageUrl = newItem.imageUrl;
      const weather = newItem.weather;
      const token = getToken();
      return addClothingItem({ name, imageUrl, weather }, token).then((res) => {
        setClothingItems([res.data, ...clothingItems]);
      });
    }
    handleSubmit(addItem);
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    function registerUser() {
      return auth.register({ email, password, name, avatar }).then(() => {
        handleLogin({ email, password });
      });
    }
    handleSubmit(registerUser);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    function loginUser() {
      return auth.login({ email, password }).then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setIsLoggedIn(true);

          auth.getUserProfile(res.token).then((res) => {
            setCurrentUser(res);
            navigate("/profile");
          });
        }
      });
    }
    handleSubmit(loginUser);
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
            setIsLiked(true);
          })

          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
            setIsLiked(false);
          })
          .catch((err) => console.error("Error toggling card like:", err));
  };

  const handleCardDelete = () => {
    function deleteCard() {
      return deleteClothingItem(selectedCard._id).then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id)
        );
      });
    }
    handleSubmit(deleteCard);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getUserProfile(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch((err) => console.error("Error fetching user profile:", err));
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                    handleCardLike={handleCardLike}
                    isLiked={isLiked}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      isLoggedIn={isLoggedIn}
                      handleEditProfileClick={handleEditProfileClick}
                      handleCardLike={handleCardLike}
                      isLiked={isLiked}
                      onSignOut={onSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            handleRegister={handleRegister}
            handleLoginRoute={handleLoginRoute}
            isLoading={isLoading}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            handleRegisterRoute={handleRegisterRoute}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            onProfileSubmit={onProfileSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            confirmationModal={handleDeleteCardClick}
            isLoading={isLoading}
          />
          <ConfirmDeleteModal
            activeModal={activeModal}
            item={selectedCard}
            onClose={closeActiveModal}
            handleCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
