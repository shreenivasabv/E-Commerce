import React, { useState } from "react";
import "./CSS/LoginSignUp.css";
import { useNavigate } from "react-router-dom";



const LoginSignUp = () => {
  const [state, setState] = useState("Login");
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

 async function handleSubmit(e) {
  e.preventDefault();

  if (state === "Login") {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Go to homepage (or wherever you want)
      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  }
}


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <form onSubmit={handleSubmit} className="loginsignup-fields">

          {state === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Continue</button>

          {state === "Login" ? (
            <p className="loginsignup-login">
              Don’t have an account?{" "}
              <span onClick={() => setState("Sign Up")}>
                Create one
              </span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Already have an account?{" "}
              <span onClick={() => setState("Login")}>
                Login here
              </span>
            </p>
          )}

          {state === "Sign Up" && (
            <div className="loginsignup-agree">
              <input type="checkbox" />
              <p>
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignUp;
