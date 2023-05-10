import { useContext, createContext, useReducer, useEffect, useState } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";
import useAllRecipes from "../hooks/useAllRecipes";
import axios from "../api/recipeApi";
import useSearchRecipe from "../hooks/useSearchRecipe";
import { useNavigate } from "react-router-dom";
import turkishtoEnglish from "turkishtoenglish";


const RecipeContext = createContext(initialState);

export const RecipeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const [recipes, setRecipes]=useState([]);
  const navigate = useNavigate();


  const [allRecipes, errorAllRecipes, isLoadingAllRecipes, allx, ink] = useAllRecipes ({
    axiosInstance:axios,
    method: "GET",
    url: "/recipes",
    requestConfig: {
      "Content-Language": "tr",
    }
  })

  useEffect(()=>{
    setRecipes(allRecipes)
  }, [allRecipes])
 

   useEffect(()=>{
    if(state.randomRecipeClick===false || state.searchRecipeClick===true) return;

     if(recipes?.length===0 ||recipes===undefined){
      recipes?.sort(() => 0.5 - Math.random());
     dispatch({
      type: "RECIPE",
      payload: {
        randomRecipeLoading: true,
        randomRecipe: [],

        
      },
    });
    return;
     }else if (recipes){
    const randoms=recipes.sort(() => 0.5 - Math.random());
     dispatch({
      type: "RECIPE",
      payload: {
        randomRecipe: randoms[0],
        
      },
    });
    localStorage.setItem("random-recipe", JSON.stringify(randoms[0]));

     }

     return ()=>{
      recipes && dispatch({
        type: "RECIPE",
        payload: {
          randomRecipeClick:false,
          randomRecipeLoading: false
        },
      });
     }
   },[state.randomRecipeClick, recipes])

  const getRandomRecipe = async (e) => {
    e.preventDefault();
       dispatch({
          type: "RECIPE",
          payload: {
            randomRecipe:[],
            randomRecipeClick: true,
            randomRecipeLoading: true
          },
        });
        navigate(`/random-recipes`);

  };

  const [randomSearchedRecipe] = useSearchRecipe(recipes, state.query);

  useEffect(()=>{
    if(state.searchRecipeClick===false || state.randomRecipeClick===true ) return;

     if(recipes.length===0 ||recipes===undefined){

     dispatch({
      type: "RECIPE",
      payload: {
        randomRecipeLoading: true,
        randomRecipe: []
      
      },
    });
    return;
     }else if(recipes){
      if(!randomSearchedRecipe){
        dispatch({
          type: "RECIPE",
          payload: {
            randomSearchError: true,
            randomRecipeLoading:false
          },
        });
        return;
      }
    
    dispatch({
      type: "RECIPE",
      payload: {
        randomRecipe: randomSearchedRecipe,
        randomRecipeLoading:false
      },
    });
     console.log(randomSearchedRecipe)
     localStorage.setItem("random-recipe", JSON.stringify(randomSearchedRecipe));

     }

     return ()=>{
      randomSearchedRecipe && dispatch({
        type: "RECIPE",
        payload: {
          randomSearchClick:false
        },
      });
     }

   },[state.searchRecipeClick, recipes])

  const getSearchRecipe = (e) => {
    e.preventDefault();
      dispatch({
        type: "RECIPE",
        payload: {
          randomRecipe:[],
          searchRecipeClick: true,
          randomRecipeLoading:true,

        },
      });
    //turkishtoEnglish() is a npm package to convert turkish characters
    navigate(`/random-recipes/search/${turkishtoEnglish(state.query) || "random"}`);

  };

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
    recipeDetail:state.recipeDetail,
    errorRecipeDetail:state.errorRecipeDetail,
    isLoadingRecipeDetail: state.isLoadingRecipeDetail,
    errorAllRecipes: errorAllRecipes,
    isLoadingAllRecipes: isLoadingAllRecipes,
    randomRecipeLoading:state.randomRecipeLoading,
    randomSearchError: state.randomSearchError
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
