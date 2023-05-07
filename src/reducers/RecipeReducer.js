export const initialState = {
  allRecipes: [],
  recipe:[],
  isLoadingAllRecipes: false,
  errorAllRecipes: "",
  isLoadingRecipeDetail:false,
  errorRecipeDetail:"",
  randomRecipeClick:false,
  searchRecipeClick:false,
  randomRecipe:[],
  query:"",
  recipeDetail:[],
  cardError:"",
  randomRecipeLoading:false

};

const RecipeReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        allRecipes:action.payload.allRecipes,
        recipe:action.payload.recipe,
        isLoadingAllRecipes: action.payload.isLoadingAllRecipes,
        isLoadingRecipeDetail:action.payload.isLoadingRecipeDetail,
        errorAllRecipes: action.payload.errorAllRecipes,
        errorRecipeDetail:action.payload.errorRecipeDetail
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
     allRecipes: action.payload.allRecipes,
     recipe:action.payload.recipe

      };
    case "FETCH_ERROR":
      return {
        ...state,
        errorAllRecipes: action.payload.errorAllRecipes,
        errorRecipeDetail:action.payload.errorRecipeDetail,
        allRecipes: action.payload.allRecipes,
      };
    case "FETCH_FINALLY":
      return {
        ...state,
        isLoadingAllRecipes: action.payload.isLoadingAllRecipes,
        isLoadingRecipeDetail:action.payload.isLoadingRecipeDetail
      };

   
      case "RECIPE":
        return{
        ...state,
          randomRecipe: action.payload.randomRecipe,
          randomRecipeClick: action.payload.randomRecipeClick,
          searchRecipeClick: action.payload.searchRecipeClick,
          cardError:action.payload.cardError,
          randomRecipeLoading: action.payload.randomRecipeLoading
         
          
        }

        case "QUERY":
          return {
            ...state,
            query: action.payload.query
          }

     
            case "RECIPE_DETAIL":
              return {
                ...state,
                recipeDetail: action.payload.recipeDetail

              }

    default: {
      throw new Error("Error in reducer");
    }
  }
};

export default RecipeReducer;
