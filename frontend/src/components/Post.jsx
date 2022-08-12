import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  IoEllipsisHorizontal,
  IoPaperPlaneOutline,
  MdComment,
} from "react-icons/all";

import "./post.css";

import api from "../services/api";

export default function Post({ post }) {
  const [comment, setComment] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadComments() {
      if (post.comments) {
        setNumberOfComments(post.comments.length);
      } else {
        const { data } = await api.get(`/comments/${post.id}`);
        setNumberOfComments(data.numberOfComments);
      }
    }

    loadComments();
  }, []);

  async function handleComment(e) {
    if (e.key === "Enter") {
      await api.post(`/comments/${post.id}`, {
        text: comment,
      });
      setComment("");
    }
  }

  async function handleSubmitComment() {
    await api.post(`/comments/${post.id}`, { text: comment });
    setComment("");
  }

  return (
    <div className="post-container">
      <header className="post__header">
        <Link to={`/profile/${post?.user.id}`} className="post__info">
          <div
            className="post__user-avatar"
            style={{ backgroundImage: `url(${post.user.avatar_url})` }}
          ></div>
          <strong className="post__user-username">
            {post.user.username}
            <span className="post__data">
              {`${new Date(post.created_at).getDate()}/${new Date(
                post.created_at
              ).getDay()}/${new Date(post.created_at).getFullYear()} `}
              {`${new Date(post.created_at).getHours()}:${new Date(
                post.created_at
              ).getMinutes()}`}
            </span>
          </strong>
        </Link>
        <IoEllipsisHorizontal size={24} />
      </header>
      <div
        className="post__image"
        style={{ backgroundImage: `url(${post.image_url})` }}
      ></div>
      <footer className="post__footer">
        <div className="footer__left">
          {numberOfComments > 0 ? numberOfComments : 0}
          <MdComment
            size={24}
            fill="#9c9c9e"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/posts/${post.id}`);
            }}
          />
        </div>
        <div className="input__container">
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={handleComment}
            placeholder="O que vc acha?"
          />
          <IoPaperPlaneOutline size={24} onClick={handleSubmitComment} />
        </div>
      </footer>
    </div>
  );
}
