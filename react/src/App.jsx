import { BrowserRouter, Routes, Route } from 'react-router-dom';
// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponenet from "./Composants/HeaderComponent" 
import RecipeFormComponent from "./Composants/RecipeFormComponent"
import RecipeDetailComponent from "./Composants/RecipeDetailComponent"
import RecipeListComponent from './Composants/RecipeListComponent';
import FavoriteRecipeComponent from './Composants/FavoriteRecipesComponent';
import FooterConponent from './Composants/FooterComponent';
function App() {

  return (
    <>
     
    <BrowserRouter>

      <ToastContainer />

      {/* header */}
      <HeaderComponenet />

      {/* <RecipeFormComponent /> */}

        <Routes>

        {/* Route de la page d'accueil */}
          <Route path="/" element={<RecipeListComponent />} />
          {/* Route de la page de formulaire  d'ajouter une recette*/}
          <Route path="/addrecipe" element={<RecipeFormComponent />} />
          {/* Route de la page de detail de la recette */}
          <Route path="/recipe/:id" element={<RecipeDetailComponent />} />
          {/* Route de la page des favoris */}
          <Route path="/favoris" element={<FavoriteRecipeComponent />} />
        </Routes>
        {/* Footer */}
        <FooterConponent />

      </BrowserRouter>

    </>
  )
}

export default App
