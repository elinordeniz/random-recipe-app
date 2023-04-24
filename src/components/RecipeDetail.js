import "../styles/RecipeDetail.css";
import useRecipe from "../contexts/RecipeContext";
import useRecipeDetail from "../hooks/useRecipeDetail";
import { useParams, useNavigate } from "react-router";
import axios from "../api/recipeApi";

const RecipeDetail = () => {
  const params = useParams();

  const [recipe, errorRecipeDetail, isLoadingRecipeDetail] = useRecipeDetail({
    axiosInstance: axios,
    method: "GET",
    url: `/recipe/${params.id}`,
    requestConfig: {
      "Content-Language": "tr",
    },
  });
  const recipeDetail =  recipe[0];

  const navigate = useNavigate();
  console.log("errorRecipeDetail" + errorRecipeDetail);
  console.log(recipeDetail);
  console.log("isLoadingRecipeDetail" + isLoadingRecipeDetail);

  console.log(
    "params.id === recipeDetail?.id +params.id " + params.id ===
      recipeDetail?.id + params.id
  );

  !isLoadingRecipeDetail  && errorRecipeDetail && !recipeDetail && !params.id && setTimeout(()=>{
    navigate('/')
  },5000)
  return (
    <div className="RecipeDetail">
      {isLoadingRecipeDetail && !recipeDetail && (
        <div className="loading">...Loading</div>
      )}
      {!isLoadingRecipeDetail && !recipeDetail && errorRecipeDetail && (
        <div className="error">
          Error! {errorRecipeDetail}. It may not connect API. <br />
          <p>Redirecting to Home in 5 seconds!</p>
        </div>
      )}

      {!isLoadingRecipeDetail && recipeDetail && (
        <>
          <div className="first-row">
            <div className="image">
              <img src={recipeDetail?.img} alt="" />
            </div>
            <div className="detail">
              <div className="title">
                <h1>{recipeDetail?.title}</h1>
                <h3>Malzemeler</h3>
              </div>
              <div className="ingredients">
                <ul>
                  {recipeDetail?.ingredients?.map((ingredient, index) => (
                    <li key={index}>
                      <span key={index + 300} style={{ fontWeight: 400 }}>
                        {ingredient.amount}{" "}
                      </span>
                      <span key={index + 400} style={{ fontWeight: 400 }}>
                        {ingredient.ingredientValue}{" "}
                      </span>
                      <span key={index + 500} style={{ fontWeight: 200 }}>
                        {ingredient.ingredientKey}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="second-row">
            <div className="title">
              <h3>Nasıl Yapılır?</h3>
            </div>
            <div className="descriptions">
              <ul>
                {recipeDetail?.descriptionSteps?.map((step, key) => (
                  <>
                    <span key={key + 200}>{step.step}. Adım</span>
                    <li key={key + 600}>{step.description}</li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
