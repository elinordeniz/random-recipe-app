import axios from "axios";

const BASE_URL= "https://food-recipe-api.p.rapidapi.com";

export default axios.create({
    baseURL: BASE_URL,
    headers:{
        'X-RapidAPI-Key' :process.env.REACT_APP_MEAL_RECIPE_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_MEAL_RECIPE_API_HOST,
        contentType:'application/json; charset=utf-8',
        accept: "image/*",
      

    }
})