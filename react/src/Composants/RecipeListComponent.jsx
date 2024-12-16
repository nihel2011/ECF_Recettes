import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./styles/recipeList.css"

const RecipeListComponent = () => {
    const [recipes, setRecipes]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("http://localhost:3003/allrecipe");
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des recettes :", error);
                setError("Erreur lors de la récupération des recettes.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchRecipes();
    }, []);
    

    const toggleFavorite = async (id) => {
        try {
            const response = await fetch(`http://localhost:3003/recipes/${id}/favorite`, {
                method: "POST",
            });

            if (response.ok) {
                const updatedRecipe = await response.json();
                setRecipes((prevRecipes) =>
                    prevRecipes.map((recipe) =>
                        recipe._id === id
                            ? { ...recipe, isFavorite: updatedRecipe.isFavorite }
                            : recipe
                    )
                );
                 // Afficher une notification toast
            toast.success(
                updatedRecipe.isFavorite
                    ? "Ajouté aux favoris !"
                    : "Retiré des favoris !"
            );
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour des favoris :", error);
            toast.error("Erreur : Impossible de mettre à jour le favori.");
        }
    };
    
    return (
        <>
        <div className="recipe-list-container">
            <h1 className="recipe-list-title">Liste des recettes</h1>
            {loading && <p>Chargement des recettes...</p>}
            {error && <p className="message-error">{error}</p>}
            {recipes.length > 0 ? (
                recipes.map((recipe) => (
                    <div key={recipe._id} className="recipe-card">
                    <img
                            className="recipe-image"
                            src={recipe.image || "https://via.placeholder.com/300"}
                            alt={recipe.title}
                        />
                    <h2 className="recipe-title">Titre de la recette : {recipe.title}</h2>

                    {/* Description de la recette */}
                    <p className="recipe-description">Description de la recette :  {recipe.description.substring(0, 100)}...</p>
                    <p className="recipe-temps">Temps de preparation : {recipe.tempsPreparation}</p>
                    <p className="recipe-nbrPortions">Nombre de portions : {recipe.nbrPortions}</p>
                    <button className="favoris-button" onClick={() => toggleFavorite(recipe._id)}>
                        {recipe.isFavorite ? "Retirer des Favoris" : "Ajouter aux Favoris"}
                    </button>

                    <Link to={`/recipe/${recipe._id}`} className="recipe-link">Voir la recette</Link>
                    </div>
                ))
            ) : (
                <p>Aucune recette disponible.</p>
            )}


                    
        </div>
        </>
    )
}

export default RecipeListComponent