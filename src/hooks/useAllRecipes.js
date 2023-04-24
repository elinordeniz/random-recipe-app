import { useEffect, useReducer, useState, useRef } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";

const useAllRecipes = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const { allRecipes, errorAllRecipes, isLoadingAllRecipes } = state;
  const [isMounted, setIsMounted] = useState(false);
  const [check, setCheck] = useState(false);
  const effectran = useRef(false);


  useEffect(() => {
    console.log("beginning of useeffect rendered");
    const controller = new AbortController();

    dispatch({ 
      type: "FETCH_START",
      payload:{
        allRecipes:[],
        isLoadingAllRecipes:true,
        errorAllRecipes:""
      }
     });
    if (effectran.current) {
      setIsMounted(true);

      console.log("effectran if block rendered");

      const fetchAllRecipe = async () => {
        console.log("before try block rendered");

        try {
          console.log("beginning of try block");
          const response = await axiosInstance[method.toLowerCase()](url, {
            ...requestConfig,
            signal: controller.signal,
          });
         
          const res = response.data;
          console.log("try block rendered");

          isMounted &&
            dispatch({
              type: "FETCH_SUCCESS",
              payload:{  
                allRecipes:res
              }
            });


        } catch (err) {
          console.log("err block rendered" + err);
          dispatch({
            type: "FETCH_ERROR",
            payload: {
              errorAllRecipes: err.message,
            } 
          });
        } finally {
          console.log("finally block rendered");
          setCheck(allRecipes?.length===0);

          dispatch({
            type: "FETCH_FINALLY",
            payload:{
              isLoadingAllRecipes:false
            }
          });
        }
      };

      fetchAllRecipe();
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
  }, [check]);

  console.log("end of component right after useeffect");


   
  return [allRecipes,errorAllRecipes,isLoadingAllRecipes];
};
export default useAllRecipes;
