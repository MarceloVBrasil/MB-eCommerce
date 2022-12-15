import React, { useEffect } from "react";
import "./ShoppingCartIcon.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserProvider"

export default function Search() {
  const { isLoggedIn, user, getTotalQuantityInCart, totalQuantityInCart } = useUser()


  useEffect(() => {
   getTotalQuantityInCart(user.id)
  }, [])


  return (

      <Link to={ isLoggedIn ? "/cart" : "/login"}>
        <div className="shopping-cart-icon">
        <ShoppingCartIcon className="shopping-cart-icon__cart" />
        {
            isLoggedIn && <div className="shopping-cart-icon__cart-quantity">{ totalQuantityInCart }</div>
        }
        </div>        
      </Link>
  );


}
