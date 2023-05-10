import { useEffect, useReducer, useState, useRef } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";

const useAllRecipes = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const { allRecipes, errorAllRecipes, isLoadingAllRecipes } = state;

  const [allx, setAllx]=useState([])

  const effectran = useRef(false);
  const ink = useRef([]);

  useEffect(() => {
    // console.log("beginning useffect")
    const controller = new AbortController();
    if (effectran.current) {
      dispatch({
        type: "FETCH_START",
        payload: {
          allRecipes: [],
          isLoadingAllRecipes: true,
          errorAllRecipes: "",
        },
      });
      const fetchAllRecipe = async () => {
        // console.log("beginning fetchAllRecipe")
        return new Promise(async (resolve, reject) => {
          try {
            // console.log("beginning fetchAllRecipe try block")
  
            const response = await axiosInstance[method.toLowerCase()](url, {
              ...requestConfig,
              signal: controller.signal,
            });
  
            let res = await response.data;
            // console.log("res"+res)
    
            resolve(res);
          } catch (err) {
            console.log(err);
            dispatch({
              type: "FETCH_ERROR",
              payload: {
                errorAllRecipes: err.message,
                allRecipes: [],
              },
            });
            reject(new Error(err));
          }
        });
      };
  
      fetchAllRecipe()
        .then((res) => {
        // console.log("beginning fetchAllRecipe then block")
          setAllx(res);
          ink.current = res;
          dispatch({
            type: "FETCH_SUCCESS",
            payload: {
              allRecipes: res,
            },
          });
        })
        .then(() => {
          //console.log("beginning fetchAllRecipe 2. then block")
  
          dispatch({
            type: "FETCH_FINALLY",
            payload: {
              isLoadingAllRecipes: false,
            },
          });
          controller.abort();
        }).catch((err)=>{
           console.log(err)
          controller.abort();

        })
    } else {
      //console.log("beginning effectran else block")
      effectran.current = true;
 
    }
  
    // console.log("end of useffect just before return")
  
    //eslint-disable-next-line
  }, [effectran.current]);
  

  return [allRecipes, errorAllRecipes, isLoadingAllRecipes];
};
export default useAllRecipes;
