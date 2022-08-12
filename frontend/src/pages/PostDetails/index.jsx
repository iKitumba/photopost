import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import Header from "../../components/Header";
import "./styles.css";
import Post from "../../components/Post";
import Comment from "../../components/Comment";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { post_id } = useParams();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data")
      ? JSON.parse(localStorage.getItem("user_data"))
      : null;

    if (!!user_data) {
      api.defaults.headers.authorization = `Bearer ${user_data.token}`;

      async function loadPostDetails() {
        const { data } = await api.get(`/posts/${post_id}`);

        setPost(data);
      }

      loadPostDetails();
    } else {
      navigate("/login", { replace: true });
    }
  }, [post_id]);

  return (
    <div className="post-wrapper">
      <Header />
      <div className="postdetails__container">
        <div className="postdetails__post">{post && <Post post={post} />}</div>
        <div className="comments__container">
          {post &&
            post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
}
