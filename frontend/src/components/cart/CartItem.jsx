import { useSelector, useDispatch } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";

import { images, roundTotalCost } from "../../utils/index";
import { TEST_ID } from "../../test/consts";
import { removeItem } from "../../reducers/cartSlice";

import "./Cart.css";

function CartItem({ _id, model, type, price, value }) {
  const dispatch = useDispatch();
  return (
    <div key={_id} className="cart-item-wrapper" data-testid={TEST_ID.CART_ITEM+_id}>
      <img
        className="cart-item-image"
        src={
          type === "t-shirt" ? images["tshirtImage"] : images[type + "Image"]
        }
        alt="cart-product"
      />
      <div data-testid={TEST_ID.CART_ITEM_MODEL+_id}>{model}</div>
      <div data-testid={TEST_ID.CART_ITEM_TOTAL_COST+_id}>
        {roundTotalCost(price * value)} ({value})
      </div>
      <div>
        <button
          onClick={() =>
            dispatch(removeItem({ _id, model, type, price, value }))
          }
        >
          <MdRemoveShoppingCart />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
