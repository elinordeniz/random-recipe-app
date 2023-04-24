import React, {useReducer} from 'react'
import '../styles/Nav.css';
import useRecipe from '../contexts/RecipeContext';
import { Link} from 'react-router-dom';
const Nav = () => {
  const {getRandomRecipe, randomRecipeClick, searchRecipeClick, getSearchRecipe, onChangeHandle,query}= useRecipe();

  return (
    <div className='Nav'> 
     <div className='header'>
            <div className='logo'>
               <Link to="/"> <h1>Bugün ne pişirsem?</h1></Link>
            </div>
        </div>
    
            <div className='search-area'>
              <div className='form'>
              <form onSubmit={getSearchRecipe}>
              <input 
              type="text" 
              placeholder='Rasgele tarif için malzeme adı girin'
              value={query}
              onChange={onChangeHandle}
              />
                <button className='search-button' type='submit'>Ara</button>
              </form>
              </div>
              <div className='btn-random'>
                <button className='random-button' onClick={getRandomRecipe}>Rasgele Tarif</button>
                </div>
            </div>
           
        
    </div>

  )
}

export default Nav