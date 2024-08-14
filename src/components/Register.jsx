import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const Navigatetologin = useNavigate();
  //   console.log(username, email, password);

  //  handle register function to get user email and password
  const handleregister = async (e) => {
    e.preventDefault();
    try {
      if (username == "" || email == "" || password == "") {
        alert("Please fil out all field");
        return null;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      alert("succesfulluly! Registered!");
      Navigatetologin("/");
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  return (
    <div className="border p-4 m-5 border-dark border-1 rounded">
      <h2 className="text-primary bold text-center text-decoration-underline">
        Registeration Form
      </h2>
      <form onSubmit={handleregister}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User Name
          </label>
          <input
            type="name"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div className="form-text">{/* error message section */}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div className="form-text">{/* error message section */}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Accecpt the Terms and conditions ...
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
