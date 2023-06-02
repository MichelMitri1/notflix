import { auth } from "../init";
import "../components/Navbar.css";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { logout } from "../features/user";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Navbar() {
  // const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const [, setUser] = useState({});

  function alertFunction() {
    alert("Haven't got the time to implement this feature yet, sorry!");
  }
  function logoutUser() {
    signOut(auth);
    dispatch(logout());
    navigate("/");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <nav className="navbar__container">
      <h1 className="navbar__title">NOTFLIX</h1>
      <div className="navbar__links">
        <button
          className="navbar__linkActive"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
        <button onClick={() => alertFunction()} className="navbar__link">
          TV Shows
        </button>

        <button onClick={() => alertFunction()} className="navbar__link">
          Latest
        </button>

        <button onClick={() => alertFunction()} className="navbar__link">
          My List
        </button>

        <button className="logout__button" onClick={() => logoutUser()}>
          Log Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
