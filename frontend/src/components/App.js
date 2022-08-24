import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../reducers/itemSlice";

import Item from "../components/item/Item";
import Cart from "../components/cart/Cart";
import { TEST_ID } from "../test/consts";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      await dispatch(fetchItems());
    };
    getItems();
  }, []);

  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  return (
    <div className="App">
      {isCartOpen ? (
        <Cart closeCart={closeCart} />
      ) : (
        <button data-testid={TEST_ID.BTN_CART_ON} onClick={openCart}>
          open
        </button>
      )}
      <h1 data-testid={TEST_ID.HEADER} className="title">
        X-Shop
      </h1>
      <div data-testid={TEST_ID.ITEMS_WRAPPER} className="items-wrapper">
        {items.map((item, index) => (
          <Item
            key={item._id}
            {...item}
            index={index}
            testId={`${TEST_ID.ITEM}${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
