import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const username = "";
  const password = "";
  const otp = "";
  const [inputUsername, setInputUsername] = useState(username);
  const [inputPassword, setInputPassword] = useState(password);
  const [inputOtp, setInputOtp] = useState(otp);
  const [showpassword, setShowPassword] = useState(false);

  const validateLogin = () => {
    return (
      inputUsername === "senthil" &&
      inputPassword === "123456" &&
      inputOtp === "123456"
    );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (validateLogin()) {
      navigate("/home");
    } else {
      window.alert("Invalid username, password, or OTP");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showpassword ? "text" : "password"}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
              <button
                type="button"
                 onClick={() => setShowPassword(!showpassword)}
              >
                <FontAwesomeIcon icon={showpassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="otp">OTP:</label>
            <input
              id="otp"
              type="text"
              value={inputOtp}
              onChange={(e) => setInputOtp(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
