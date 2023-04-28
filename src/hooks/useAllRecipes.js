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
    const controller = new AbortController();

    if (effectran.current) {
      setIsMounted(true);
      dispatch({
        type: "FETCH_START",
        payload: {
          //allRecipes:[],
          isLoadingAllRecipes: true,
          errorAllRecipes: "",
        },
      });

      const fetchAllRecipe = async () => {
        try {
          const response = await axiosInstance[method.toLowerCase()](url, {
            ...requestConfig,
            signal: controller.signal,
          });

          const res = response.data;

          isMounted &&
            dispatch({
              type: "FETCH_SUCCESS",
              payload: {
                allRecipes: res,
              },
            });
        } catch (err) {
          dispatch({
            type: "FETCH_ERROR",
            payload: {
              errorAllRecipes: err.message,
            },
          });
        } finally {
          setCheck(allRecipes?.length === 0);

          dispatch({
            type: "FETCH_FINALLY",
            payload: {
              isLoadingAllRecipes: false,
            },
          });
        }
      };

      fetchAllRecipe();
    } else {
      effectran.current = true;
      setCheck(true);
      setIsMounted(false);
      controller && controller.abort();
    }

    return () => {
      controller && controller.abort();
      setIsMounted(false);
    };

    //eslint-disable-next-line
  }, [check]);

  return [allRecipes, errorAllRecipes, isLoadingAllRecipes];
};
export default useAllRecipes;
