import { useContext } from "react";

import cameraLogo from "../assets/camera-outline.svg";
import { Link } from "react-router-dom";
import { MdPostAdd, MdPerson, MdLogout, MdSettings } from "react-icons/md";

import { AuthContext } from "../contexts/authContext";

import "./header.css";

export default function Header() {
  const { handleLogout } = useContext(AuthContext);
  const user_data = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data"))
    : null;

  return (
    <header className="header-menu">
      <nav className="header__nav">
        <Link to="/new" className="nav__link">
          <span>Novo</span>
          <MdPostAdd size={24} />
        </Link>
        <Link
          to={user_data ? `/profile/${user_data.user.id}` : "/"}
          className="nav__link"
        >
          <span>Perfil</span>
          <MdPerson size={24} />
        </Link>
      </nav>
      <Link to="/" className="logo">
        <span>Photopost</span>
        <img src={cameraLogo} alt="Logo" className="logo-image" />
      </Link>
      <nav className="header__nav">
        <Link to="/" className="nav__link">
          <span>Configurar</span>
          <MdSettings size={24} />
        </Link>
        <button className="logout-button" onClick={handleLogout}>
          <span>Sair</span>
          <MdLogout size={24} />
        </button>
      </nav>
    </header>
  );
}
