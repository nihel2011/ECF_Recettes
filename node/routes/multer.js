const express = require("express");
const router = express.Router();
const { upload } = require("../multer/Multer");
// Route for image upload and analysis
router.post("/uploads", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Handle Multer-specific errors
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .json({ error: "File upload error: " + err.message });
      }

      // Handle other errors
          return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
          return res
            .status(400)
            .json({ error: "No file provided. Please upload an image." });
        }
        // log du fichier pour voir ce que multer a retourné
        // console.log("Uploaded file:", req.file);
        // Si l'upload a marché :
        const fileUrl = `http://localhost:3003/uploads/${req.file.filename}`;
        // console.log("File URL:", fileUrl);
        res.status(200).json({
          message: "File uploaded successfully!",
          fileUrl: fileUrl,
        });
      });
    });
    module.exports = router;