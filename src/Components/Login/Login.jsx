import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("mahdi@gmail.com");
  const [password, setPassword] = useState("1234");

  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__control">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="form__control">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div className="form__buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
