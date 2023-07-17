import {Outlet} from 'react-router-dom';
import Nav from './Nav';
import '../styles/App.css'


const Layout = () => {
  return (
    <>
        <Nav /> 
        <Outlet />
    </>
  )
}

export default Layout