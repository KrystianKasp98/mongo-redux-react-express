import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { fetchItems } from "../reducers/itemSlice";
import Item from "../components/item/Item";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const items = await dispatch(fetchItems());
      setItems(items.payload);
    };
    getItems();
  }, []);

  return (
    <div className="App">
      <h1 className="title">X-Shop</h1>
      <div className="items-wrapper">
        {items.map((item) => (
          <Item key={item._id}{...item} />
        ))}
      </div>
    </div>
  );
}

export default App;
