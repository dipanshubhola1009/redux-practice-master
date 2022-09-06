import React, { useEffect } from "react";
import { LockClosedIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { saveUserDataInMemory } from "../../utils/session-storage";
import { useNavigate } from "react-router-dom";
import "./signup.css"
const Signup = () => {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem("isAuthenticated") === true){
      navigate("/home");
    }
  })
  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      username: event.target[0].value,
      password: event.target[1].value,
      isAuthenticated : true
    };
    const userDetails = JSON.parse(localStorage.getItem("userData"));
    if(userDetails.username === data.username && userDetails.password === data.password){
      saveUserDataInMemory(data);
      navigate("/home")
    }
    else{
      alert("wrong username or password")
    }
  };

   const handleSignUp = (event) => {
    event.preventDefault();
    const data = {
      username: event.target[0].value,
      password: event.target[1].value
    };
    saveUserDataInMemory(data);
    navigate("/home")
  };
  return (
    <>
        <div className="sign-up">
          <div>
          <div className="sign-up-details">
            <UserCircleIcon className="sign-img" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
              Sign in to your account
            </h2>
          </div>
          <form
            className="sign-up-form"
            onSubmit={(event) => {
              // console.log(event.target[1].value);
              handleLogin(event);
            }}
          >
            <div  className="sign-up-form-input" >
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=""
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=""
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="sign-up-button">
              <button
                type="submit"
              >
                <span >
                  <LockClosedIcon
                    className="icon"
                  />
                </span>
                <span>
                  Sign in
                </span>
              </button>
            </div>
          </form>
          </div>
          <div>
            <div className="sign-up-details">
            <UserCircleIcon className="sign-img" />

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
              Sign up
            </h2>
          </div>
          <form
            className="sign-up-form"
            onSubmit={(event) => {
              // console.log(event.target[1].value);
              handleSignUp(event);
            }}
          >
            <div  className="sign-up-form-input" >
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className=""
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=""
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="sign-up-button">
              <button
                type="submit"
              >
                <span >
                  <LockClosedIcon
                    className="icon"
                  />
                </span>
                <span>
                  Sign up
                </span>
              </button>
            </div>
          </form>
          </div>
        </div>
    </>
  );
};

export default Signup;
