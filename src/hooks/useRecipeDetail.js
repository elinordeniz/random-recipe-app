import { useEffect, useReducer, useState, useRef } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";
import { useParams } from "react-router";

const useRecipeDetail = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const { recipeDetail, errorRecipeDetail, isLoadingRecipeDetail, randomRecipe } = state;
  const [isMounted, setIsMounted] = useState(false);
  const [check, setCheck] = useState(false);
  const effectran = useRef(false);
   console.log("url usesearch "+url)
   const params=useParams();



  useEffect(() => {
    console.log("beginning of useeffect rendered");
    const controller = new AbortController();

 
    if (effectran.current) {

      console.log("effectran if block rendered");

      const fetchRecipe = async () => {
        console.log("before try block rendered");
      setIsMounted(true);
      dispatch({ 
        type: "FETCH_START",
        payload:{
         recipeDetail:[],
         isLoadingRecipeDetail:true,
         errorRecipeDetail:""
        }
     });
        try {
          console.log("beginning of try block");
          const response = await axiosInstance[method.toLowerCase()](url, {
            ...requestConfig,
            signal: controller.signal,
          });
         
          const res =await response.data;
          console.log("try block rendered");
           console.log(res+"res")
          isMounted &&
            dispatch({
              type: "RECIPE_DETAIL",
              payload:{  
                recipeDetail:res
              }
            });


        } catch (err) {
          console.log("err block rendered" + err);
          dispatch({
            type: "FETCH_ERROR",
            payload: {
              errorRecipeDetail: err.message,
            }
          });
        } finally {
           console.log(randomRecipe)
          console.log("finally block rendered");
           console.log(recipeDetail.length+"recipeDetail.length"+recipeDetail.id+"recipeDetail.id"+randomRecipe.id+"randomRecipe.id")
           console.log(randomRecipe.id!==recipeDetail.id || recipeDetail.length!==0)
           setCheck(randomRecipe.id!==recipeDetail.id || recipeDetail.length!==0);
          //setCheck(recipe.length!==0)
          //params.id!==recipe?.id || 

         !check && dispatch({
            type: "FETCH_FINALLY",
            payload:{
              isLoadingRecipeDetail:false
            }
          });

          controller && controller.abort();
        }
      };

    fetchRecipe();
    } else {
      effectran.current = true;
      console.log("effectran else block rendered");
      setCheck(true);
     // setIsMounted(false);
      //controller && controller.abort();
    }

    return () => {
      controller && controller.abort();
      setIsMounted(false);
      console.log("return rendered");
    };

    //eslint-disable-next-line
  }, [check]);

  console.log("end of component right after useeffect");


    console.log(errorRecipeDetail)


  return [recipeDetail, errorRecipeDetail, isLoadingRecipeDetail];
};
export default useRecipeDetail;
