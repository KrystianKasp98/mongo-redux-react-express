import { useSelector, useDispatch } from "react-redux";

import CartItem from "./CartItem";
import { TEST_ID } from "../../test/consts";
import MongoDbApi from "../../api/mongoDbApi";
import { GrFormClose } from "react-icons/gr";
import { BsFillCartCheckFill } from "react-icons/bs";
import { fetchItems } from "../../reducers/itemSlice";
import { clearAll } from "../../reducers/cartSlice";

import "./Cart.css";

function Cart({ closeCart }) {
  const dispatch = useDispatch();
  const Items = [...useSelector((state) => state.cart.items)];
  const cartItems = Items.reverse();
  const cartTotalCost = useSelector((state) => state.cart.totalCost);

  const handleBuyItems = (e) => {
    e.preventDefault();
    cartItems.forEach(async(item) => {
      await MongoDbApi.updateItemCount(item, item.value);
    })
    dispatch(clearAll());
    dispatch(fetchItems());
  }

  return (
    <div className="cart-wrapper" data-testid={TEST_ID.CART}>
      <div className="cart-title">
        <div
          className="cart-remove-all"
          data-testid={TEST_ID.CART_BUTTON_CLEAR}
          onClick={() => dispatch(clearAll())}
        >
          clear all
        </div>
        <div
          onClick={closeCart}
          className="cart-exit"
          data-testid={TEST_ID.CART_BUTTON_EXIT}
        >
          <GrFormClose />
        </div>
      </div>
      <div
        className="cart-items-wrapper"
        data-testid={TEST_ID.CART_ITEMS_WRAPPER}
      >
        {cartItems.map((item) => (
          <CartItem key={item._id} {...item} />
        ))}
      </div>
      <div className="cart-total" data-testid={TEST_ID.CART_TOTAL}>
        <span>Total: {cartTotalCost}</span>
        <button className="buy-items" onClick={handleBuyItems} data-testid={TEST_ID.CART_BUY_ITEMS}>
          <BsFillCartCheckFill />
        </button>
      </div>
    </div>
  );
}

export default Cart;
