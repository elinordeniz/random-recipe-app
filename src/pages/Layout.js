import {Outlet} from 'react-router-dom';
import Nav from './Nav';
import '../styles/App.css'


const Layout = () => {
  return (
    <div className='App'>
        <Nav /> 
        <Outlet />
    </div>
  )
}

export default Layout