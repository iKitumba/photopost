import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

import api from "../../services/api";

import logo from "../../assets/logo.png";

import "./styles.css";

export default function Login() {
  const { usernameRef, passwordRef, handleLogin, isSubmiting } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null;

    if (user_data) {
      api.defaults.headers.authorization = `Bearer ${user_data.token}`;
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="Photopost" className="login-logo" />
        <label className="label">
          SEU USERNAME *
          <input
            type="text"
            name="username"
            ref={usernameRef}
            required
            placeholder="Digite um username"
            className="textInput"
          />
        </label>
        <label className="label">
          SENHA *
          <input
            type="password"
            name="password"
            ref={passwordRef}
            required
            placeholder="Sua senha"
            className="textInput"
          />
        </label>
        <div className="form__footer">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmiting}
          >
            ENTRAR
          </button>
          <Link to="/register" className="already__dont-have">
            Não tenho conta
          </Link>
        </div>
      </form>
    </div>
  );
}
