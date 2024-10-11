import { NavLink } from "react-router-dom";
import Auth0 from '../../Auth0';
const NavBar = () => {

const activeStyle = "underline underline-offset-4"



   return(
    <nav className="flex justify-between items-center fixed z-10  top-0 w-full py-5 px-8 text-sm font-light ">
        <ul className="flex items-center gap-3" >
          <li className="font-semibold text-lg">
            <NavLink to='/' >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/crear'
            className={({isActive}) =>isActive? activeStyle:undefined}>
             Crear
            </NavLink>
          </li>
        </ul> 
        <ul className="flex items-center gap-3">
          <li className="text-black/60">
            <Auth0/>
          </li>
        </ul>   
    </nav>
   ) 
}

export default NavBar