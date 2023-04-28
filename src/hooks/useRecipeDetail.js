import { useEffect, useReducer, useState, useRef } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";
import { useParams } from "react-router";

const useRecipeDetail = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const { recipe, errorRecipeDetail, isLoadingRecipeDetail, randomRecipe } = state;
  const [isMounted, setIsMounted] = useState(false);
  const [check, setCheck] = useState(false);
  const effectran = useRef(false);
   console.log("url usesearch "+url)
   const params=useParams();



  useEffect(() => {
    console.log("beginning of useeffect rendered");
    const controller = new AbortController();

 
    if (effectran.current) {
      setIsMounted(true);
      dispatch({ 
        type: "FETCH_START",
        payload:{
          recipe:[],
          recipeDetail:[],
          isLoadingRecipeDetail:true,
          errorRecipeDetail:""
        }
     });
      
      console.log("effectran if block rendered");

      const fetchRecipe = async () => {
        console.log("before try block rendered");

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
              type: "FETCH_SUCCESS",
              payload:{  
                recipe:res
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
          console.log("finally block rendered");
          setCheck(randomRecipe.id!==recipe.id || recipe.length!==0);
          //setCheck(recipe.length!==0)
          //params.id!==recipe?.id || 

         !check && dispatch({
            type: "FETCH_FINALLY",
            payload:{
              isLoadingRecipeDetail:false
            }
          });
        }
      };

    fetchRecipe();
    } else {
      effectran.current = true;
      console.log("effectran else block rendered");
      setCheck(true);
      setIsMounted(false);
      controller && controller.abort();
    }

    return () => {
      controller && controller.abort();
      setIsMounted(false);
      console.log("return rendered");
    };

    //eslint-disable-next-line
  }, [params.id, check]);

  console.log("end of component right after useeffect");
   console.log(recipe)

    console.log(errorRecipeDetail)


  return [recipe, errorRecipeDetail, isLoadingRecipeDetail];
};
export default useRecipeDetail;
