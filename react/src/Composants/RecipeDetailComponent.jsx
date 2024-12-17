import { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import "./styles/recipeDetail.css";
import { toast } from "react-toastify";

const RecipeDetailComponent = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const [recipe, setRecipe] = useState(null); // Stocke les détails de la recette
    const [loading, setLoading] = useState(true); // Indique si les données sont en cours de chargement
    const [error, setError] = useState(null); // Stocke une erreur si elle se produit
    const navigate = useNavigate(); // Utilisé pour la navigation

    // Récupération des détails de la recette
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3003/recipe/${id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération de la recette.");
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

      // Gestion de la suppression
      const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Êtes-vous sûr de vouloir supprimer cette recette ?"
        );
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3003/recipe/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert("Recette supprimée avec succès.");
                    toast.success("Recette supprimée avec succès.");
                    navigate("/"); // Redirection vers la page d'accueil après suppression
                } else {
                    alert("Erreur lors de la suppression de la recette.");
                    toast.error("Erreur lors de la suppression de la recette.");
                }
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    };


    // Affichage pendant le chargement
    if (loading) {
        return <div className="loading">Chargement des détails de la recette...</div>;
    }

    // Affichage en cas d'erreur
    if (error) {
        return <div className="error">Erreur : {error}</div>;
    }

    // Affichage des détails de la recette
    return (
        <div className="recipe-detail-container">
            <h1 className="recipe-title">{recipe.title}</h1>
            <img
                className="recipe-image"
                src={recipe.image || "https://via.placeholder.com/600"}
                alt={recipe.title}
            />
            <p className="recipe-description">{recipe.description}</p>

            <div className="recipe-info">
                <p>
                    <strong>Temps de préparation :</strong> {recipe.tempsPreparation}
                </p>
                <p>
                    <strong>Nombre de portions :</strong> {recipe.nbrPortions}
                </p>
                <p>
                    <strong>Type de cuisine :</strong> {recipe.cuisine}
                </p>
                <p>
                    <strong>Catégorie :</strong> {recipe.categorie}
                </p>
            </div>

            <div className="recipe-ingredients">
                <h2>Ingrédients :</h2>
                <ul>
                    {recipe.ingredients.split("\n").map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className="recipe-steps">
                <h2>Étapes :</h2>
                <ol>
                    {recipe.etapes.split("\n").map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>

            <div className="recipe-tips">
                <h2>Conseils :</h2>
                <p>{recipe.conseils}</p>
            </div>

            <div className="recipe-delete">
                <button className="delete-button" onClick={handleDelete}>Supprimer la recette</button>



            </div>
        </div>
    );
};

export default RecipeDetailComponent;
