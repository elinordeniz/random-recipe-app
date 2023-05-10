import { useEffect, useReducer, useState, useRef } from "react";
import RecipeReducer, { initialState } from "../reducers/RecipeReducer";
import { useParams } from "react-router";

const useRecipeDetail = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;
  const [state, dispatch] = useReducer(RecipeReducer, initialState);
  const {
    recipeDetail,
    errorRecipeDetail,
    isLoadingRecipeDetail,
    randomRecipe,
  } = state;

  const effectran = useRef(false);

  useEffect(() => {
    // console.log("beginning of useeffect rendered");
    dispatch({
      type: "FETCH_START",
      payload: {
        recipeDetail: [],
        isLoadingRecipeDetail: true,
        errorRecipeDetail: "",
      },
    });

    const controller = new AbortController();
    if (effectran.current) {
      // console.log("effectran if block rendered");

      const fetchRecipe = async () => {
        return new Promise(async (resolve, reject) => {
          // console.log("before try block rendered");

          try {
            console.log("beginning of try block");
            const response = await axiosInstance[method.toLowerCase()](url, {
              ...requestConfig,
              signal: controller.signal,
            });

            const res = await response.data;
            console.log(res);
            resolve(res);
          } catch (err) {
            // console.log("err block rendered" + err);
            dispatch({
              type: "FETCH_ERROR",
              payload: {
                errorRecipeDetail: err.message,
                recipeDetail: [],
              },
            });
            reject(new Error(err));
          }
        });
      };
      fetchRecipe()
        .then((res) => {
          dispatch({
            type: "RECIPE_DETAIL",
            payload: {
              recipeDetail: res,
            },
          });
        })
        .then(() => {
          dispatch({
            type: "FETCH_FINALLY",
            payload: {
              isLoadingRecipeDetail: false,
            },
          });
          controller.abort();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      effectran.current = true;
      // console.log("effectran else block rendered");
    }

    //eslint-disable-next-line
  }, [effectran.current]);

  // console.log("end of component right after useeffect");

  return [recipeDetail, errorRecipeDetail, isLoadingRecipeDetail];
};
export default useRecipeDetail;
