import { auth } from "../init.js";
import React, { useRef, useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";
import { useDispatch } from "react-redux";
import { login } from "../features/user";

function Loginpage() {
  const navigate = useNavigate();
  let userEmail = useRef("");
  let userPassword = useRef("");
  const [, setUser] = useState({});
  const [loginError, setLoginError] = useState(
    "Please log in with your account."
  );

  const dispatch = useDispatch();
  async function userLogin(event) {
    event.preventDefault();
    if (userEmail.current.value === "" || userPassword.current.value === "") {
      setLoginError("Please enter an email and password.");
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          userEmail.current.value,
          userPassword.current.value
        );
        setLoginError("user has been logged in");
        navigate("/home");
      } catch (error) {
        setLoginError(error.message);
      }
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        dispatch(
          login({
            name: user.displayName,
            age: 17,
            email: user.email,
          })
        );
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <section className="loginpage__container">
      <form onSubmit={(event) => userLogin(event)}>
        <div className="loginpage__wrapper">
          <h1 className="loginpage__title">NOTFLIX</h1>
          <h4 className="loginpage__subtitle">{loginError}</h4>
          <input
            type="email"
            className="loginpage__email"
            ref={userEmail}
            required
            placeholder="Email"
          />
          <input
            type="password"
            className="loginpage__password"
            ref={userPassword}
            required
            placeholder="Password"
          />
          <button
            className="loginpage__button"
            onClick={(event) => userLogin(event)}
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="signup__button"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </form>
    </section>
  );
}

export default Loginpage;
