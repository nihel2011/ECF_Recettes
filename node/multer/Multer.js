const multer = require("multer");
const path = require('path');

// Configuration de stockage avec Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Dossier où les images seront enregistrées
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Nom unique pour éviter les conflits
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  };
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
    }
  });
  module.exports = {upload};
