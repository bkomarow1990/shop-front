import React from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AiFillShop, AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
  const { isAuth, user } = useTypedSelector((store) => store.auth);
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className='d-flex gap-1'>
            <AiFillShop size={25}></AiFillShop>
            <h5 className='p-0 m-0'>Shop</h5>

            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Головна
                </Link>
              </li>
            </ul>
            {isAuth ?
            (<ul className="navbar-nav">
              <li className="nav-item text-white">
                {user.email}
              </li>
              <li className="nav-item">
                <Link to='/cart' className='d-flex gap-2 justify-content-center align-items-center cursor-pointer text-decoration-none text-white'>
                  <h5 className='p-0 m-0'>Cart</h5>
                  <AiOutlineShoppingCart size={20}></AiOutlineShoppingCart>
                </Link>
              </li>
            </ul>) :
            (
              <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Вхід
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Реєстрація
                </Link>
              </li>
              
            </ul>
            )  
          
          }
            
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar;