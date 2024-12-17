// Importation du modèle
const Recipe = require("../models/Recipe");

// Ajouter une recette

const addRecipe = async (req, res) => {
    try {
        const { tempsPreparation, ...otherData } = req.body;

        // Conversion de "00:24" en nombre total de minutes
        const [hours, minutes] = tempsPreparation.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;

        // const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const recipe = await Recipe.create({
            ...otherData,
            tempsPreparation: totalMinutes,
            // image: imagePath,
        });

        res.status(201).json({
            message: "Recette ajoutée avec succès.",
            recipe,
        });
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de l'ajout de la recette.",
            error: error.message,
        });
    }
};

// Afficher une seule recette
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recette introuvable.",
            });
        }

        res.status(200).json(recipe);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération de la recette.",
            error: error.message,
        });
    }
};

// Afficher toutes les recettes
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la récupération des recettes.",
            error: error.message,
        });
    }
};

// Ajouter ou retirer une recette aux favoris
const toggleFavorite = async (req, res) => {
    const recipeId = req.params.id;
    try{
        // Trouver la recette par son ID
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({
                message: "Recette introuvable.",
            });
        }

        // Modifier le champ "favoris" de la recette
        recipe.isFavorite = !recipe.isFavorite;

        // Enregistrer les modifications dans la base de données
        await recipe.save();

        res.status(200).json({
            message: `Recette ${recipe.isFavorite ? "ajoutée aux favoris" : "retirée des favoris"}`,
            isFavorite: recipe.isFavorite,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour des favoris", error: error.message });
    }
};

// Rechercher des recettes
const searchRecipes = async (req, res) => {
    const { q } = req.query; // Récupération de la chaîne de recherche
    try {
        const recipes = await Recipe.find({
            title: { $regex: q, $options: "i" } // Recherche insensible à la casse
        });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la recherche des recettes" });
    }
};

// Supprimer une recette
const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!deletedRecipe) {
            return res.status(404).json({
                message: "Recette introuvable ou déjà supprimée.",
            });
        }

        res.status(200).json({
            message: "Recette supprimée avec succès.",
            recipe: deletedRecipe,
        });
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la suppression de la recette.",
            error: error.message,
        });
    }
};

// Mettre à jour une recette
const updateRecipe = async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({
                message: "Recette introuvable pour la mise à jour.",
            });
        }

        res.status(200).json({
            message: "Recette mise à jour avec succès.",
            recipe: updatedRecipe,
        });
    } catch (error) {
        res.status(400).json({
            message: "Erreur lors de la mise à jour de la recette.",
            error: error.message,
        });
    }
};

module.exports = {
    addRecipe,
    getRecipe,
    getAllRecipes,
    toggleFavorite,
    searchRecipes,
    deleteRecipe,
    updateRecipe,
};



