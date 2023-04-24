import {Outlet} from 'react-router-dom';
import { RecipeProvider } from "../contexts/RecipeContext";


const ProviderLayout = () => {
  return (
    <div className='App'>
        <RecipeProvider>
        <Outlet />
        </RecipeProvider>
        
    </div>
  )
}

export default ProviderLayout