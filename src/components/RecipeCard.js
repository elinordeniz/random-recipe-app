import React from "react";
import "../styles/RecipeCard.css";
import useRecipe from "../contexts/RecipeContext";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router";


const RecipeCard = () => {
  const {
    randomRecipe,
    searchRecipeClick,
    randomRecipeClick,
    goToRecipe,
    isLoadingAllRecipes,
    errorAllRecipes
  } = useRecipe();
  const navigate=useNavigate()

  !randomRecipe && errorAllRecipes && !isLoadingAllRecipes && setTimeout(()=>{
    navigate('/')
  },5000)
  
  return (
    <div className="RecipeCard">
  
      {isLoadingAllRecipes && !randomRecipe && (
        <div className="loading">...Loading</div>
      )}
      {!isLoadingAllRecipes && !randomRecipe && errorAllRecipes && (
        <div className="error">
          Error! {errorAllRecipes}. It may not connect API.
           <br />
          <p>Redirecting to Home in 5 seconds!</p>
        </div>
      )}
      {randomRecipe &&
        ((searchRecipeClick || randomRecipeClick) && (
          <>
            <div className="image">
              <img src={randomRecipe?.img} alt="" />
            </div>
            <div className="detail">
              <div className="title">
                <h1>{randomRecipe?.title}</h1>
              </div>
              <div className="share-buttons">
                <button>Favorilere Ekle</button>
                <button>Paylaş</button>
              </div>
             
              <div className="go-recipe-button">
                <Link to={`/random-recipe/${randomRecipe?.id}`}>
                  <button onClick={goToRecipe}>Tarife Git</button>
                </Link>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default RecipeCard;
