import { useState } from "react";
import { toast } from "react-toastify";

import "./styles/recipeForm.css";

const RecipeFormComponent = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        ingredients: "",
        etapes: "",
        categorie: "",
        image: "",
        cuisine: "",
        tempsPreparation: "",
        nbrPortions: "",
        conseils: "",
    });
    const [imageFile, setImageFile] = useState(null);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Mettre à jour l'image choisie
        }
    };

    const handleTempsChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "tempsPreparation" && !/^\d{2}:\d{2}$/.test(value)) {
            setErrors((prev) => ({ ...prev, tempsPreparation: "Format invalide. Utilisez HH:mm." }));
            return;
        }
    
        setFormData({ ...formData, [name]: value });
    };
    
    

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title || formData.title.length < 3) {
            newErrors.title = "Le titre doit contenir au moins 3 caractères.";
        }
        if (!formData.description) {
            newErrors.description = "La description est obligatoire.";
        }
        if (!formData.ingredients) {
            newErrors.ingredients = "Les ingrédients sont obligatoires.";
        }
        if (!formData.etapes) {
            newErrors.etapes = "Les étapes de préparation sont obligatoires.";
        }
        if (!formData.categorie) {
            newErrors.categorie = "La catégorie est obligatoire.";
        }
        if (!formData.cuisine) {
            newErrors.cuisine = "Le type de cuisine est obligatoire.";
        }
        if (!formData.tempsPreparation) {
            newErrors.tempsPreparation = "Le temps de préparation est obligatoire.";
        }
        if (!formData.nbrPortions) {
            newErrors.nbrPortions = "Le nombre de portions est obligatoire.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // const formDataToSend = { ...formData };
       

        try {
              // D'abord on envoi l'image 
            let imagePath = "";
            if (imageFile) {
                const formDataFile = new FormData();
                formDataFile.append("image", imageFile);
                // console.log(recipe);
                // console.log("Image Preview:", imagePreview);
                const imageResponse = await fetch("http://localhost:3003/images/uploads",
                {
                    method: "POST",
                    body: formDataFile,
                });
                if (!imageResponse.ok) {
                throw new Error("Erreur lors de l'upload de l'image.");
                }
                const imageData = await imageResponse.json();
                // console.log('imageData', imageData);
                imagePath = imageData.fileUrl; // Le chemin retourné par votre API
                // console.log("Image Path:", imagePath);
            }
              // Mise à jour du champ `img` dans l'objet recette
              console.log("imagePath", imagePath);
                const formDataToSend = { ...formData, image: imagePath };
                console.log("formDataToSend", formDataToSend);
                
                const response = await fetch("http://localhost:3003/recipe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataToSend),
            });

            if (response.ok) {
                console.log("Recette ajoutée avec succès");
                setFormData({
                    title: "",
                    description: "",
                    ingredients: "",
                    etapes: "",
                    categorie: "",
                    image: "",
                    cuisine: "",
                    tempsPreparation: "",
                    nbrPortions: "",
                    conseils: "",
                });
                setErrors({});
                toast.success("Recette ajoutée avec succès !");
            } else {
                console.error("Erreur lors de l'ajout de la recette.");
                toast.error("Erreur lors de l'ajout de la recette.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    };

    return (
        <>
                    <h1>Formulaire de recette</h1>

        <div className="container-recipe">
            {/* <h1>Formulaire de recette</h1> */}
            <form onSubmit={handleSubmit}>
                {/* Titre */}
                <div className="form-group-input">
                    <label htmlFor="title">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Titre de la recette"
                        required
                    />
                    {errors.title && <div className="error">{errors.title}</div>}
                </div>

                {/* Description */}
                <div className="form-group-textarea">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description de la recette"
                        required
                    />
                    {errors.description && (
                        <div className="error">{errors.description}</div>
                    )}
                </div>

                {/* Ingrédients */}
                <div className="form-group-textarea">
                    <label htmlFor="ingredients">Ingrédients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        placeholder="Liste des ingrédients"
                        required
                    />
                    {errors.ingredients && (
                        <div className="error">{errors.ingredients}</div>
                    )}
                </div>

                {/* Étapes */}
                <div className="form-group-textarea">
                    <label htmlFor="etapes">Étapes</label>
                    <textarea
                        id="etapes"
                        name="etapes"
                        value={formData.etapes}
                        onChange={handleChange}
                        placeholder="Étapes de préparation"
                        required
                    />
                    {errors.etapes && <div className="error">{errors.etapes}</div>}
                </div>

                {/* Catégorie */}
                <div className="form-group-select">
                    <label htmlFor="categorie">Catégorie</label>
                    <select
                        id="categorie"
                        name="categorie"
                        value={formData.categorie}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="entres">Entrées</option>
                        <option value="plats">Plats principaux</option>
                        <option value="desserts">Desserts</option>
                        <option value="boissons">Boissons</option>
                        <option value="apéritifs">Apéritifs</option>
                        <option value="petit-dej">Petit-déj/brunch</option>
                    </select>
                    {errors.categorie && (
                        <div className="error">{errors.categorie}</div>
                    )}
                </div>

                {/* Cuisine */}
                <div className="form-group-select">
                    <label htmlFor="cuisine">Type de cuisine</label>
                    <select
                        id="cuisine"
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Sélectionnez un type de cuisine</option>
                        <option value="francaise">Française</option>
                        <option value="italienne">Italienne</option>
                        <option value="asiatique">Asiatique</option>
                        <option value="autre">Autre</option>
                    </select>
                    {errors.cuisine && (
                        <div className="error">{errors.cuisine}</div>
                    )}
                </div>

                {/* Temps de préparation */}
                <div className="form-group-input">
                    <label htmlFor="tempsPreparation">Temps de préparation</label>
                    <input
                        type="time"
                        id="tempsPreparation"
                        name="tempsPreparation"
                        value={formData.tempsPreparation}
                        onChange={handleTempsChange}
                        required
                    />
                    {errors.tempsPreparation && (
                        <div className="error">{errors.tempsPreparation}</div>
                    )}
                </div>

                {/* Nombre de portions */}
                <div className="form-group-input">
                    <label htmlFor="nbrPortions">Nombre de portions</label>
                    <input
                        type="number"
                        id="nbrPortions"
                        name="nbrPortions"
                        min="1"
                        max="30"
                        value={formData.nbrPortions}
                        onChange={handleChange}
                        required
                    />
                    {errors.nbrPortions && (
                        <div className="error">{errors.nbrPortions}</div>
                    )}
                </div>

                {/* Conseils */}
                <div className="form-group-textarea">
                    <label htmlFor="conseils">Conseils</label>
                    <textarea
                        id="conseils"
                        name="conseils"
                        value={formData.conseils}
                        onChange={handleChange}
                        placeholder="Conseils de cuisine"
                    />
                </div>

                {/* Image */}
                <div className="form-group-input">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                {/* Bouton de soumission */}
                <button type="submit">Ajouter une recette</button>
            </form>
        </div>
        </>
    );
};

export default RecipeFormComponent;
