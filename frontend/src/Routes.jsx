import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import New from "./pages/New";

import PostDetails from "./pages/PostDetails";

export default function () {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Feed />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile/:user_id" element={<Profile />} />
      <Route path="/posts/:post_id" element={<PostDetails />} />
    </Routes>
  );
}
