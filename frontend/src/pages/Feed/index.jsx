import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import Header from "../../components/Header";
import "./styles.css";
import Post from "../../components/Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null;

    if (user_data) {
      api.defaults.headers.authorization = `Bearer ${user_data.token}`;

      (async function () {
        const { data } = await api.get("/posts");
        setPosts(data);
      })();
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="post-wrapper">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
