import { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router";

import api from "../services/api";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setIsSubmiting(true);
    const loginData = {
      [usernameRef.current.name]: usernameRef.current.value,
      [passwordRef.current.name]: passwordRef.current.value,
    };

    const { data } = await api.post("/users/auth", loginData);
    localStorage.setItem("user_data", JSON.stringify(data));

    navigate("/", { replace: true });
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login", { replace: true });
    // window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{
        usernameRef,
        passwordRef,
        handleLogin,
        isSubmiting,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
