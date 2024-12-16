const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");

// Liste des favoris
const getFavoris = async (req, res) => {
  try {
    const favoris = await Recipe.find({ isFavorite: true });
    res.status(200).json(favoris);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retirer une recette des favoris
const removeFavoris = async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndUpdate(id, { isFavorite: false });
    res.status(200).json({ message: "Recette retirée des favoris." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { 
    getFavoris,
    removeFavoris 
};
