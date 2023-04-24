import React, {useEffect} from 'react'
import useRecipe from '../contexts/RecipeContext'

const Recipe = () => {
    const {allRecipes, error} =useRecipe();
    //  useEffect(()=>{
    //     setTimeout(()=>{
    //       console.log(allRecipes)
    //        console.log(error)
    //         console.log(test)
    //     },1000)
    //  }, [])
    console.log(allRecipes)
    console.log(error)
     
  return (
    <div>
        
        <p>{error}</p>

        {
            allRecipes.map((recipe,index)=>{
                return(
                    <p key={index}> {recipe.title}</p>
                )
            })
        }

    </div>
  )
}

export default Recipe