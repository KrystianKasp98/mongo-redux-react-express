import { useSelector } from "react-redux";

import { images, roundTotalCost } from "../../utils/index";
import { TEST_ID } from "../../test/consts";

import "./Cart.css";





function Cart({closeCart}) {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalCost = useSelector((state) => state.cart.totalCost);
  console.log(cartItems);

  return (
    <div className="cart-wrapper" data-testid={TEST_ID.CART}>
      <div className="cart-title"><div onClick={closeCart} className="cart-exit">x</div></div>
      <div className="cart-items-wrapper">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item-wrapper">
            <img
              className="cart-item-image"
              src={
                item.type === "t-shirt"
                  ? images["tshirtImage"]
                  : images[item.type + "Image"]
              }
              alt="cart-product"
            />
            <div>{item.model}</div>
            <div>
              {roundTotalCost(item.price * item.value)} ({item.value})
            </div>
            <div>
              <button>x</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">Total: {cartTotalCost}</div>
    </div>
  );
}

export default Cart;
