import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/header.css';

const HeaderComponent = () => {
  const [search, setSearch] = useState(''); // État pour la barre de recherche
  const [results, setResults] = useState([]); // État pour les résultats de la recherche
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu burger

  // Gestion du changement dans la barre de recherche
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Requête vers le backend pour récupérer les résultats correspondants
  useEffect(() => {
    if (search.trim().length > 0) {
      axios.get(`http://localhost:3003/recipes?q=${search}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des résultats', error);
        });
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <>
      <header className="App-header">
        {/* Logo */}
        <div className="App-logo">
          Recettes en or
        </div>

        {/* Menu burger pour mobiles */}
        <div className="burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>

        {/* Navigation */}
        <nav className={`App-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            </li>
            <li>
              <Link to="/addrecipe" onClick={() => setIsMenuOpen(false)}>Ajouter une recette</Link>
            </li>
            <li>
              <Link to="/favoris" onClick={() => setIsMenuOpen(false)}>Favoris</Link>
            </li>
          </ul>
        </nav>

        {/* Barre de recherche */}
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
                    <Link to={`/recipe/${recipe._id}`} onClick={() => setSearch('')}>
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
