import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import "../components/Signup.css";
import { db, auth } from "../init";
import { addDoc, collection } from "firebase/firestore";

function Signup() {
  const emailReg = useRef("");
  const passReg = useRef("");
  const nameReg = useRef("");
  const navigate = useNavigate();

  async function registerUser() {
    if (
      !emailReg.current.value ||
      !passReg.current.value ||
      !nameReg.current.value
    ) {
      alert("Please enter the below fields to register your account");
      return;
    }

    await createUserWithEmailAndPassword(
      auth,
      emailReg.current.value,
      passReg.current.value
    );
    const user = auth.currentUser;
    user.displayName = nameReg.current.value;

    await updateProfile(
      auth.currentUser,
      {
        displayName: nameReg.current.value,
      },
      (err) => {
        return err;
      }
    );
    addDoc(collection(db, "ratings"), {
      rating: 0,
      ratingValue: 0,
      uid: user.uid,
    });
    navigate("/");
  }

  return (
    <div className="container">
      <div className="row">
        <div className="signup__title--wrapper">
          <button className="movie__backButton" onClick={() => navigate("/")}>
            ← Back
          </button>
          <h1 className="signup__title">Register your account</h1>
        </div>
        <input
          type="text"
          placeholder="Enter your username"
          ref={nameReg}
          required
          className="signup__name"
        />
        <input
          type="email"
          placeholder="Enter email"
          ref={emailReg}
          required
          className="signup__email"
        />
        <input
          type="password"
          placeholder="Enter password"
          ref={passReg}
          required
          className="signup__password"
        />
        <button onClick={() => registerUser()} className="register__button">
          Register Account
        </button>
      </div>
    </div>
  );
}

export default Signup;
