const routes = require("express").Router();
const multer = require("multer");

const uploadConfig = require("./config/upload");

const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostController");
const ProfileController = require("./controllers/ProfileController");
const CommentController = require("./controllers/CommentController");

const authMiddleware = require("./middlewares/auth");
const CountCommentsController = require("./controllers/CountCommentsController");

const avatarUpload = multer(uploadConfig("avatars"));
const postUpload = multer(uploadConfig("posts"));

routes.post(
  "/users/register",
  avatarUpload.single("avatar"),
  UserController.store
);
routes.post("/users/auth", UserController.authenticate);

routes.get("/posts", authMiddleware, PostController.index);
routes.get("/posts/:post_id", authMiddleware, PostController.show);
routes.post(
  "/posts",
  authMiddleware,
  postUpload.single("image"),
  PostController.store
);

routes.delete("/posts/:post_id", authMiddleware, PostController.destroy);

routes.get("/comments/:post_id", authMiddleware, CountCommentsController.index);
routes.post("/comments/:post_id", authMiddleware, CommentController.store);

routes.get("/profiles/:user_id", authMiddleware, ProfileController.show);

module.exports = routes;
