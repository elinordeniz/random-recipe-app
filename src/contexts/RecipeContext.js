import { useContext, createContext, useReducer } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";
import useAllRecipes from "../hooks/useAllRecipes";
import axios from "../api/recipeApi";
import useSearchRecipe from "../hooks/useSearchRecipe";
import { useNavigate } from "react-router-dom";
import turkishtoEnglish from "turkishtoenglish";

const RecipeContext = createContext(initialState);

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const navigate = useNavigate();

  const [allRecipes, errorAllRecipes, isLoadingAllRecipes] = useAllRecipes({
    axiosInstance: axios,
    method: "GET",
    url: "/recipes",
    requestConfig: {
      "Content-Language": "tr",
    },
  });

  const getRandomRecipe = () => {
    console.log(allRecipes);

    allRecipes?.sort(() => 0.5 - Math.random());
    allRecipes &&
      dispatch({
        type: "RECIPE",
        payload: {
          randomRecipe: allRecipes[0],
          randomRecipeClick: true,
          searchRecipeClick: false,
        },
      });
    console.log(allRecipes[0]);
    navigate("/random-recipe");
  };

  const [randomSearchedRecipe] = useSearchRecipe(allRecipes, state.query);

  const getSearchRecipe = (e) => {
    e.preventDefault();
    //turkishtoEnglish() is a npm package to convert turkish characters
    navigate(`/random-recipes/${turkishtoEnglish(state.query) || "random"}`);

    randomSearchedRecipe &&
      dispatch({
        type: "RECIPE",
        payload: {
          randomRecipe: randomSearchedRecipe,
          randomRecipeClick: false,
          searchRecipeClick: true,
        },
      });
  };

  // useEffect(()=>{
  //   dispatch({
  //     type: "RECIPE_DETAIL",
  //     payload:{
  //         recipeDetail: recipe[0],

  //     }
  //    })
  //     console.log("useffet ran in recipe detail one")
  // }, [recipe])

  const onChangeHandle = (e) => {
    dispatch({
      type: "QUERY",
      payload: { query: e.target.value },
    });
  };

  const values = {
    allRecipes: allRecipes,
    getRandomRecipe,
    getSearchRecipe,
    randomRecipe: state.randomRecipe,
    randomRecipeClick: state.randomRecipeClick,
    searchRecipeClick: state.searchRecipeClick,
    query: state.query,
    onChangeHandle,
    // recipeDetail:state.recipeDetail,
    // errorRecipeDetail:errorRecipeDetail,
    // isLoadingRecipeDetail: isLoadingRecipeDetail,
    errorAllRecipes: errorAllRecipes,
    isLoadingAllRecipes: isLoadingAllRecipes,

    //goToRecipe
  };

  return (
    <RecipeContext.Provider value={values}>{children}</RecipeContext.Provider>
  );
};

const useRecipe = () => {
  const context = useContext(RecipeContext);

  if (context === undefined) {
    throw new Error("Error context");
  }

  return context;
};

export default useRecipe;
