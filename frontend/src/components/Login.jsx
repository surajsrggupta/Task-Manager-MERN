import React, { useState } from "react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endPoint = isRegister ? "register" : "login";

    const response = await fetch(`http://localhost:3000/user/${endPoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Something went wrong");
      return;
    }

    // LOGIN
    if (!isRegister && data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }

    // REGISTER
    if (isRegister) {
      alert("Account created successfully, please login");
      setIsRegister(false);
    }
  };


  return (
    <div>
      <div>
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{isRegister ? "SignUp" : "Login"}</button>
        </form>

        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "New Here? Create New Account"}
        </p>
      </div>
    </div>
  );
};

export default Login;
