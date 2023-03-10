//upload.js
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
exports.upload = () => {
  const mongodbUrl =
    "mongodb+srv://wetube:Suvidha@yt-cluster.rwwtlgg.mongodb.net/?retryWrites=true&w=majority";
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
};
