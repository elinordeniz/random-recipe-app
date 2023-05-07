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
  const navigate = useNavigate();

 
  const [allRecipes, errorAllRecipes, isLoadingAllRecipes, allx, ink] = useAllRecipes ({
    axiosInstance:axios,
    method: "GET",
    url: "/recipes",
    requestConfig: {
      "Content-Language": "tr",
    }
  })
   console.log(allRecipes)

  const getRandomRecipe = async () => {
    const recipes = await allRecipes;

    recipes?.sort(() => 0.5 - Math.random());
    recipes &&
      dispatch({
        type: "RECIPE",
        payload: {
          randomRecipe: recipes[0],
          randomRecipeClick: true,
          searchRecipeClick: false,
        },
      });
    recipes &&
      localStorage.setItem("random-recipe", JSON.stringify(recipes[0]));
    navigate(`/random-recipes/${recipes[0]?.id}`);
  };

//   const middle= (res)=>{
//     dispatch({
//       type: "RECIPE",
//       payload: {
//         randomRecipeLoading:true,
//       },
//     });
//     return new Promise((resolve,reject)=>{
//       if(res.length!==0) {
//         resolve(res)
//       }else{
//         reject(new Error('error in promise'))
//       }
      
//       })
 
    
//   }
  
//   const Getall = async (all)=>{
  
//      console.log(allx)
//     middle(await allx).then((res)=>{
//        console.log(res)
//       const recipeSorted= res.sort(() => 0.5 - Math.random());
//       dispatch({
//         type: "RECIPE",
//         payload: {
//           randomRecipe:recipeSorted[0],
//           randomRecipeLoading:false,
//           randomRecipeClick: true,
//           searchRecipeClick: false,
//         },
//       });
     
//       localStorage.setItem("random-recipe", JSON.stringify(recipeSorted[0]));
//       navigate(`/random-recipes/${recipeSorted[0]?.id}`);
//     })

// }

// // Getall().then((res)=>{
// //   dispatch({
// //     type: "FETCH_SUCCESS",
// //     payload: {
// //       allRecipes:res,
// //     },
// //   });
  
// // })


//   // console.log(allx)

//   //  console.log(ink.current)


//   //  const nav =async () =>{
//   //   return new Promise(async (resolve, reject)=>{
//   //     const allre=  await allRecipes;
//   //      console.log(allRecipes)
//   //       console.log(allre)
//   //    if(allre.length!==0) {
//   //     resolve(allre)
//   //   }else{
//   //     dispatch({
//   //       type: "RECIPE",
//   //       payload: {
//   //         randomRecipeLoading:true,
//   //       },
//   //     })
//   //     reject(new Error('Hata allrecipes gelmedi'))
//   //    }
//   //   })
//   //  }



//   const getRandomRecipex = async () => {
//  console.log("getRandomRecipe clicked")

// if(allRecipes.length==0){
// Getall(await allx);
 
// }else{
//   const recipeSorted= allRecipes.sort(() => 0.5 - Math.random());
//   dispatch({
//     type: "RECIPE",
//     payload: {
//       randomRecipe:recipeSorted[0],
//       randomRecipeLoading:false,
//       randomRecipeClick: true,
//       searchRecipeClick: false,
//     },
//   });
 
//   localStorage.setItem("random-recipe", JSON.stringify(recipeSorted[0]));
//   navigate(`/random-recipes/${recipeSorted[0]?.id}`);
// }
//   // console.log(recipesAll)

  
//   // nav().then((recipesAll)=>{
//   //   const recipeSorted= recipesAll.sort(() => 0.5 - Math.random());
//   //   dispatch({
//   //     type: "RECIPE",
//   //     payload: {
//   //       randomRecipe:recipeSorted[0],
//   //       randomRecipeLoading:false,
//   //       randomRecipeClick: true,
//   //       searchRecipeClick: false,
//   //     },
//   //   });
   
//   //   localStorage.setItem("random-recipe", JSON.stringify(recipeSorted[0]));
//   //   navigate(`/random-recipes/${recipeSorted[0]?.id}`);
//   // })





//   };

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
    randomRecipeLoading:state.randomRecipeLoading
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
