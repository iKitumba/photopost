import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineUpload } from "react-icons/md";

import api from "../../services/api";

import Header from "../../components/Header";
import "./styles.css";

export default function New() {
  const [image, setImage] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  const preview = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image]
  );

  useEffect(() => {
    const user_data = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null;

    if (user_data) {
      api.defaults.headers.authorization = `Bearer ${user_data.token}`;
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    setIsSubmiting(true);
    const formData = new FormData();
    formData.append("image", image);

    await api.post("/posts", formData);
    navigate("/");
  }

  return (
    <div className="new-container">
      <Header />
      <form className="new-form" onSubmit={handleUpload}>
        <label
          className={`upload-image ${preview ? "has-preview" : ""}`}
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <MdOutlineUpload size={32} fill="#9c9c9e" />
              <p>Faça upload da sua melhor imagem</p>
            </>
          )}
          <input
            type="file"
            className="upload__image-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <div className="form__footer">
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmiting}
          >
            PUBLICAR
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            DESCARTAR
          </button>
        </div>
      </form>
    </div>
  );
}
