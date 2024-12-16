import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./styles/recipeList.css";

import { Link } from "react-router-dom";

// Composant pour afficher la liste des recettes favorites
const FavorisRecipeComponent = () => {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer la liste des recettes favorites
  const fetchFavoris = async () => {
    try {
      const response = await fetch("http://localhost:3003/favoris");
      const data = await response.json();
      setFavoris(data);
      setLoading(false);
      
    } catch (err) {
      console.error("Erreur lors de la récupération des favoris", err);
      setError("Impossible de charger les favoris.");
      setLoading(false);
    }
  };

  // Fonction pour retirer une recette des favoris
  const removeFromFavoris = async (id) => {
    try {
      const response = await fetch(`http://localhost:3003/favoris/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavoris(favoris.filter((item) => item._id !== id));
        toast.success("Recette retirée des favoris.");
      } else {
        alert("Échec de la suppression de la recette des favoris.");
        toast.error("Échec de la suppression de la recette des favoris.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression", error);
    }
  };

  // Utiliser useEffect pour récupérer les données lors du chargement du composant
  useEffect(() => {
    fetchFavoris();
  }, []);

  return (
    <>
      <div className="recipe-list-container">
        <h1 className="recipe-list-title">Mes Recettes Favoris</h1>
        {loading && <p>Chargement...</p>}
        {error && <p className="message-error">{error}</p>}

        {favoris.length > 0 ? (
          favoris.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <img
                className="recipe-image"
                src={recipe.image || "https://via.placeholder.com/300"}
                alt={recipe.title}
              />
              <h2 className="recipe-title">{recipe.title}</h2>
              <p className="recipe-description">
                {recipe.description.substring(0, 100)}...
              </p>
              <p className="recipe-temps">Temps : {recipe.tempsPreparation} min</p>
              <button 
                className="favoris-button-remove"
                onClick={() => removeFromFavoris(recipe._id)}
              >
                Retirer des favoris
              </button>
              <Link to={`/recipe/${recipe._id}`} className="recipe-link">Voir la recette</Link>

            </div>
          ))
        ) : (
          <p>Aucune recette en favoris pour le moment.</p>
        )}
      </div>
    </>
  );
};

export default FavorisRecipeComponent;
