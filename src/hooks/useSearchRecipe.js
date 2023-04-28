import { useReducer } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";

const useSearchRecipe = (allRecipes, query = "tatlı") => {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  //new array including only titles and id
  const titles = allRecipes?.map((recipe) => {
    return `${recipe.title} ${recipe.id} `;
  });
  //let query = "soslu salata";
  let split = query?.split(" ");

  var vals = [];
  //searching in titles if includes the query
  split?.map((sq) =>
    vals.push(
      titles?.filter((item) =>
        item.toLocaleLowerCase("tr").includes(sq.toLocaleLowerCase("tr"))
      )
    )
  );

  let str = vals?.toString();

  let titleList = str?.split(",");

  let idList = [];
  //new array including only ids that fits with query
  titleList?.map((val) => idList?.push(val.slice(-6)));

  //creating random id based on search query results in id list
  const randomId = idList?.sort(() => 0.5 - Math.random());

  const randomRecipes = allRecipes?.filter(
    (recipe) => parseInt(recipe.id) === parseInt(randomId[0])
  );
  const randomSearchedRecipe = randomRecipes && randomRecipes[0];

  return [randomSearchedRecipe];
};

export default useSearchRecipe;
