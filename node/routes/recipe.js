
const express = require("express");
const {
    addRecipe,
    getRecipe,
    getAllRecipes,
    toggleFavorite,
    searchRecipes,
    deleteRecipe,
    updateRecipe,
} = require("../controllers/recipeController");


// importer les favoris
const {getFavoris, removeFavoris} = require("../controllers/favorisController");

const router = express.Router();

// Route pour ajouter une recette
router.post("/recipe", addRecipe);

// Route pour mettre à jour une recette
router.put("/recipe/:id", updateRecipe);

// Route pour supprimer une recette
router.delete("/recipe/:id", deleteRecipe);

// Route pour récupérer une recette par ID
router.get("/recipe/:id", getRecipe);

// Route pour récupérer toutes les recettes
router.get("/allrecipe", getAllRecipes);

// Route pour ajouter ou retirer une recette aux favoris
router.post("/recipes/:id/favorite", toggleFavorite);

// Route pour retirer une recette des favoris
router.delete("/favoris/:id", removeFavoris);

// Route pour rechercher des recettes
router.get('/recipes', searchRecipes);

// Route pour récupérer la liste des recettes favorites
router.get("/favoris", getFavoris);
module.exports = router;
