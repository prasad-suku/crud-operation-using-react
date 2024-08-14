import React, { useState } from "react";
// importing collection,addDoc
import "../index.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseconfig";
import Showdata from "./Showdata";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Form = () => {
  const [state, setstate] = useState({
    name: "",
    age: "",
    email: "",
    place: "",
  });
  const navigate = useNavigate();
  // toastify message

  const handlesignout = async (e) => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  //   handlechange function
  const handlechange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  //   sumbit and sending data to firestore

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = {
      username: state.name,
      age: state.age,
      email: state.email,
      place: state.place,
    };

    try {
      if (
        state.age == "" ||
        state.name == "" ||
        state.email == "" ||
        state.place == ""
      ) {
        alert("Please fill out all field");
        return null;
      }
      const docRef = await addDoc(collection(db, "records"), userdata);
      console.log(`Document written with ID: ${docRef.id}`);

      alert("Data submitted ");
    } catch (error) {
      console.log(error);
    }

    setstate({ name: "", age: "", email: "", place: "" });
  };

  return (
    <>
      <nav>
        {" "}
        <div>CRUD with FireStore</div>
        <button className="btn btn-danger" onClick={handlesignout}>
          Logout
        </button>
      </nav>
      <div className="container  mt-3">
        <h2 className="text-center text-primary ">CRUD Operation </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            Name:
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handlechange}
              placeholder="Enter here"
              className="form-control"
            />
          </div>

          <div className="form-group mb-4">
            Email:
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handlechange}
              placeholder="Enter here"
              className="form-control"
            />
          </div>

          <div className="form-group mb-4">
            Place:
            <input
              type="text"
              name="place"
              value={state.place}
              onChange={handlechange}
              placeholder="Enter here"
              className="form-control"
            />
          </div>

          <div className="form-group mb-4">
            Age:
            <input
              type="text"
              name="age"
              value={state.age}
              onChange={handlechange}
              placeholder="Enter here"
              className="form-control"
            />
          </div>
          <br />

          <button className="btn btn-success mx-4" type="submit">
            Add data
          </button>
          <a className="btn btn-primary  ">
            <Link to="/showdata"> Show </Link>
          </a>
        </form>
      </div>
    </>
  );
};

export default Form;
