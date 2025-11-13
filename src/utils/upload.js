const multer = require("multer");
const path = require("path");

function createUploader(
  folder = "./uploads",
  fileTypes = /jpeg|jpg|png|gif|webp/
) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder);
    },
    filename: function (req, file, cb) {
      const randomText = Date.now() + "-" + Math.round(Math.random() * 1e9);
      let fileExtension = file.originalname.split(".");
      let extension = fileExtension[fileExtension.length - 1];
      cb(null, file.fieldname + "-" + randomText + "." + extension);
    },
  });

  function checkFileType(file, cb) {
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Invalid file type!");
    }
  }

  return multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
      files: 3,
    },
  });
}

module.exports = createUploader;
