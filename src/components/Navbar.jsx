import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Model from "../Model";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {

  let data = useCart();
  const [cartview, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand fs-3 fst-italic" to="/">
          Good-Food.
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-5 text-success" aria-current="page" to="/">
                Home
              </Link>
            </li>

            {(localStorage.getItem("authToken")) ?
              <li className="nav-item">
                <Link className="nav-link active fs-5 text-success" aria-current="page" to="/">
                  My Orders
                </Link>
              </li>
            : ""}
          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div className="d-flex">
              <Link className="btn btn-dark text-white fw-bold mx-1" aria-current="page" to="/login">Login</Link>
              <Link className="btn btn-dark text-white fw-bold mx-1" aria-current="page" to="/createuser">SignUp</Link>
            </div>
          : <div>
            <div className="btn btn-dark text-white fw-bold mx-2" onClick={() => {setCartView(true)}}>
              My Cart
              <Badge pill bg="danger">{data.length}</Badge>
            </div>
            {cartview? <Model onClose={() => {setCartView(false)}}><Cart /></Model>: null}
            <div className="btn btn-danger text-white fw-bold mx-2" onClick={handleLogOut}>LogOut</div>
          </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
