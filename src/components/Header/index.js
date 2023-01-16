import React from "react";
import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { useUser } from "../../contexts/UserProvider";
import BagIcon from "../BagIcon";

export default function Header() {
  const { isLoggedIn, logOut, user } = useUser()
  return (
    <div className="header">
      <NavLink to="/">
        <img src={logo} alt="site logo" className="header__logo" />
      </NavLink>
      { !isLoggedIn && <div className="header-links">
        <NavLink to="/register">
          <p className="header-links__link">Register</p>
        </NavLink>
        <NavLink to="/login">
          <p className="header-links__link">Login</p>
        </NavLink>
      </div>}
      {
        isLoggedIn &&
        <div className="header-links">
            {user.admin ?  <BagIcon /> : <ShoppingCartIcon /> }
            <Link to={`${user.admin ? `/admin` : `/user/${user.id}`}`}><p className="header-links__link header-links__greeting">Welcome, {user?.name}!</p></Link>
            <Link to="/login"><p className="header-links__link" onClick={logOut}>Logout</p></Link>
          </div>
      }
    </div>
  );
}
