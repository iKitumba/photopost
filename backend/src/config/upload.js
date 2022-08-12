const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = (folderName) => ({
  dest: path.resolve(__dirname, "..", "..", "uploads", folderName),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads", folderName));
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const hash = crypto.randomBytes(16).toString("hex");

      const fileName = `${hash}${ext}`;

      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/png",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      cb(new Error("Invalid file type"));
    } else {
      cb(null, true);
    }
  },
});
