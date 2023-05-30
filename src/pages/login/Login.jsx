import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="login-form">
      <h2>Log-in</h2>

      <label>
        <span>Email: </span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password: </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {isPending && (
        <button disabled className="btn" onClick={handleSubmit}>
          Loading...
        </button>
      )}

      {!isPending && (
        <button className="btn" onClick={handleSubmit}>
          Login
        </button>
      )}

      {error && <p className="error">{error}</p>}
    </form>
  );
}
