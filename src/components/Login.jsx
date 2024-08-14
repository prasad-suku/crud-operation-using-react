import React, { useState } from "react";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  console.log(email, password);

  const navigatetohome = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      if (email == "" || password == "") {
        alert("Please fil out all field");
        return null;
      }
      await signInWithEmailAndPassword(auth, email, password);
      console.log(password + " " + email);
      navigatetohome("Form");
    } catch (e) {
      alert("Invalid email & password");
      console.log(e);
    }
  };

  return (
    <div className="border border-dark border-1 p-4 mt-5 m-5 w-70 rounded">
      <h2 className="text-primary bold text-center text-decoration-underline">
        Login Page
      </h2>

      {/* form */}
      <form onSubmit={handlelogin}>
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
          <label className="form-check-label" htmlFor="exampleCheck1">
            Don't have account please <Link to={"/Register"}>Register</Link>
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
