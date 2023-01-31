import { Link } from "react-router-dom"
import "./BagIcon.scss"
import { useUser } from "../../contexts/UserProvider"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useEffect } from "react";


export default function BagIcon() {
    const { isLoggedIn, totalQuantityUndeliveredOrders, user } = useUser()

    return (
        <Link to={isLoggedIn ? user.admin ? "/admin/orders" : "/cart" : "/login"}>
            <div className="shopping-bag-icon">
                <ShoppingBagIcon className="shopping-bag-icon-bag" />
                {
                    isLoggedIn && <div className="shopping-bag-icon-bag-quantity">{totalQuantityUndeliveredOrders}</div>
                }
            </div>
        </Link>
    )
}
