import { useState, useMemo, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MdFileUpload } from "react-icons/md";

import "./styles.css";

import api from "../../services/api";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    bio: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  const preview = useMemo(
    () => (avatar ? URL.createObjectURL(avatar) : null),
    [avatar]
  );

  function handleInputChange(e) {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmiting(true);
    const formData = new FormData();

    const { username, bio, password } = registerForm;
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const { data } = await api.post("/users/register", formData);
    localStorage.setItem("user_data", JSON.stringify(data));

    api.defaults.headers.authorization = `Bearer ${data.token}`;

    navigate("/", { replace: true });
  }

  useEffect(() => {
    const user_data = localStorage.getItem("user_data");

    if (user_data) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label
          className={`upload ${preview ? "has-preview" : ""}`}
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <MdFileUpload />
              <p>Escolha um avatar</p>
            </>
          )}
          <input
            type="file"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
            }}
            id="upload-avatar"
            accept="image/*"
          />
        </label>
        <label className="label">
          SEU USERNAME *
          <input
            type="text"
            name="username"
            required
            onChange={handleInputChange}
            placeholder="Digite um username"
            className="textInput"
          />
        </label>
        <label className="label">
          BIO
          <input
            type="text"
            name="bio"
            required
            onChange={handleInputChange}
            placeholder="Quem tu és?"
            className="textInput"
          />
        </label>
        <label className="label">
          SENHA *
          <input
            type="password"
            name="password"
            required
            onChange={handleInputChange}
            placeholder="Digite uma senha"
            className="textInput"
          />
        </label>
        <div className="form__footer">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmiting}
          >
            REGISTRAR
          </button>
          <Link to="/login" className="already__dont-have">
            Já tenho uma conta
          </Link>
        </div>
      </form>
    </div>
  );
}
