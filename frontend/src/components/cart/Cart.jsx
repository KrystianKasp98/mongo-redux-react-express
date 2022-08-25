import { useSelector, useDispatch } from "react-redux";

import CartItem from "./CartItem";
import { TEST_ID } from "../../test/consts";
import { GrFormClose } from "react-icons/gr";
import { clearAll } from "../../reducers/cartSlice";

import "./Cart.css";

function Cart({ closeCart }) {
  const dispatch = useDispatch();
  const Items = [...useSelector((state) => state.cart.items)];
  const cartItems = Items.reverse();
  const cartTotalCost = useSelector((state) => state.cart.totalCost);
  console.log(cartItems);

  return (
    <div className="cart-wrapper" data-testid={TEST_ID.CART}>
      <div className="cart-title">
        <div className="cart-remove-all" onClick={()=>dispatch(clearAll())}>
          clear all
        </div>
        <div onClick={closeCart} className="cart-exit">
          <GrFormClose />
        </div>
      </div>
      <div className="cart-items-wrapper">
        {cartItems.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className="cart-total">Total: {cartTotalCost}</div>
    </div>
  );
}

export default Cart;
