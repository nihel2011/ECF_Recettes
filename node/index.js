// express
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
require('dotenv').config()


// mongoose
const mongoose = require('mongoose');

// router
const recipeRouter = require("./routes/recipe");

// cors
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173"
}));

// Middleware pour parser JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques (comme les images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// connexion à la base de donnée
// mongoose.connect(`${process.env.DATABASE_URL}/test`)

mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(() =>{
    
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
    
})
    
// app.use(express.urlencoded({ extended: true }));

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

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Le fichier doit être une image."), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 Mo
});
// routes
app.use("/", recipeRouter);


// server
app.listen(3003, () => {
    console.log("Server started on port 3003");
});