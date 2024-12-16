const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: {type: "String"},
    description: {type: "String"},
    ingredients: {type: "String" },
    etapes: {type: "String"},
    categorie: {type: "String"},
    cuisine: {type: "String"},
    tempsPreparation: {type: "String"},
    nbrPortions: {type: "Number"},
    conseils: {type: "String"},
    image: {type: "String"},
    isFavorite:{type: Boolean, default: false} // Ajout de la propriété favorites
});

module.exports = mongoose.model("Recipe", RecipeSchema);
