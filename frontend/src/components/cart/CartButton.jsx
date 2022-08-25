import { TEST_ID } from "../../test/consts";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CartButton({openCart}) {
  return (
    <div className="open-cart-wrapper">
      <button data-testid={TEST_ID.BTN_CART_ON} onClick={openCart}>
        <AiOutlineShoppingCart/>
      </button>
    </div>
  );
}

export default CartButton;