import { useEffect, useReducer } from "react"
import useRecipe from "../contexts/RecipeContext";
import RecipeReducer, {initialState} from "../reducers/RecipeReducer";


const useRandomRecipe = () =>{
    const {allRecipes} = useRecipe();
    const [state, dispatch]=useReducer(RecipeReducer, initialState);

   const temp=[];
    useEffect (()=>{
    allRecipes.sort(()=> 0.5-Math.random());
    allRecipes.map((key)=>temp.concat(key))
     console.log("randomRecipeClicked")

    }, [state.randomRecipeClick])
 
    const recipe=temp
   
    //let randoms=Math.floor(Math.random()*candyColors.length);
 console.log(recipe)
     return [recipe];
}

export default useRandomRecipe;