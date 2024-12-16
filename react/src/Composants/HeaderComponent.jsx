import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/header.css';

const HeaderComponent = () => {
  const [search, setSearch] = useState(''); // État pour la barre de recherche
  const [results, setResults] = useState([]); // État pour les résultats de la recherche

  // Gestion du changement dans la barre de recherche
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);
  };

  // Requête vers le backend pour récupérer les résultats correspondants
  useEffect(() => {
    if (search.trim().length > 0) {
      axios.get(`http://localhost:3003/recipes?q=${search}`)
        .then(response => {
          setResults(response.data); // Mettre à jour les résultats avec les données reçues
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des résultats', error);
        });
    } else {
      setResults([]); // Réinitialiser les résultats si la barre est vide
    }
  }, [search]);

  return (
    <>
      <header className="App-header">
        <div className="App-logo">
          Recettes en or
        </div>
        <nav className="App-nav">
          <ul className="nav-list">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/addrecipe">Ajouter une recette</Link></li>
            <li><Link to="/favoris">Favoris</Link></li>
          </ul>
        </nav>
        <div className="App-search">
          <input
            type="text"
            placeholder="Rechercher une recette"
            value={search}
            onChange={handleSearchChange}
          />
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((recipe) => (
                  <li key={recipe._id}>
                    <Link to={`/recipe/${recipe._id}`}>
                      {recipe.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderComponent;



