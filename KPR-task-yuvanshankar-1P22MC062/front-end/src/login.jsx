import React, { useState } from "react";
import "./signup.css";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((response) => {
        console.log(response.data);
        setIsLoggedIn(true);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Invalid credentials. Please try again.");
      });
  }

  if (isLoggedIn) {
    return (
      <div className="App">
        <div className="container">
          <h2>Hello World!</h2>
          <a href="/">Back to main</a>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-input"
            type="email"
            placeholder="email@123"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="form-button" type="submit">
            Login
          </button>
          
          <a href="/">Back to main</a>
          {error && <div className="form-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default App;
