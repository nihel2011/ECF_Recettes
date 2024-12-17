// express
const express = require("express");
const app = express();
const path = require("path");
require('dotenv').config()


// mongoose
const mongoose = require('mongoose');

// router
const recipeRouter = require("./routes/recipe");
const multerRouter = require("./routes/multer");

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

// routes
app.use("/", recipeRouter);
app.use("/images", multerRouter);


// server
app.listen(3003, () => {
    console.log("Server started on port 3003");
});