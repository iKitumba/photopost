import { Link } from "react-router-dom";
import "./comment.css";

export default function Comment({ comment }) {
  return (
    <div className="comment__container">
      <div className="comment__header">
        <Link
          to={`/profile/${comment.user.id}`}
          style={{ display: "flex", gap: ".5rem" }}
        >
          <figure
            className="comment__user-avatar"
            style={{ backgroundImage: `url(${comment.user.avatar_url})` }}
          ></figure>
          <div className="comment__user-info">
            <strong className="comment__username">
              {comment.user.username}
            </strong>
            <span className="comment__date">
              {" "}
              {`${new Date(comment.created_at).getDate()}/${new Date(
                comment.created_at
              ).getDay()}/${new Date(comment.created_at).getFullYear()} `}
              {`${new Date(comment.created_at).getHours()}:${new Date(
                comment.created_at
              ).getMinutes()}`}
            </span>
          </div>
        </Link>
      </div>
      <p className="comment__content">{comment.text}</p>
    </div>
  );
}
