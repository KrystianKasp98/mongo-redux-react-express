import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../reducers/itemSlice";

import Item from "../components/item/Item";
import { TEST_ID } from "../test/consts";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toogleCart = () => setIsCartOpen(!isCartOpen);

  useEffect(() => {
    const getItems = async () => {
      await dispatch(fetchItems());
    };
    getItems();
  }, []);

  return (
    <div className="App">
      {isCartOpen ? (
        <div data-testId={TEST_ID.CART}>Cart</div>
      ) : (
        <button data-testid={TEST_ID.BTN_CART_ON} onClick={toogleCart}>
          open
        </button>
      )}
      <h1 data-testid={TEST_ID.HEADER} className="title">
        X-Shop
      </h1>
      <div data-testid={TEST_ID.ITEMS_WRAPPER} className="items-wrapper">
        {items.map((item, index) => (
          <Item key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default App;
