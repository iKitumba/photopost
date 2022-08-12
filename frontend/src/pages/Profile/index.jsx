import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import api from "../../services/api";

import Header from "../../components/Header";
import "./styles.css";

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const { user_id } = useParams();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null;

    if (user_data) {
      api.defaults.headers.authorization = `Bearer ${user_data.token}`;
      (async function () {
        const { data } = await api.get(`/profiles/${user_id}`);
        setProfileData(data);
      })();
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="profile__wrapper">
        <header className="profile__header">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${profileData.avatar_url})` }}
          ></div>
          <strong className="profile__username">{profileData.username}</strong>
          <p className="profile__bio">{profileData.bio}</p>
        </header>
        {profileData.post?.length > 0 ? (
          <section className="profile__posts">
            {profileData.post.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <figure
                  className="profile__post"
                  style={{
                    backgroundImage: `url(${post.image_url})`,
                    cursor: "pointer",
                  }}
                ></figure>
              </Link>
            ))}
          </section>
        ) : (
          <h1 className="profile__withoutphoto">
            Vc ainda não postou nenhuma Photo (:
          </h1>
        )}
      </div>
    </div>
  );
}
