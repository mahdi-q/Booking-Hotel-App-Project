import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("mahdi@gmail.com");
  const [password, setPassword] = useState("1234");

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form">
        <div className="formControl">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="formControl">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
