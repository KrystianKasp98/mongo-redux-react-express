import React, { useState } from "react";
import "./Item.css";
import capImage from "../../assets/cap.png";
import trousersImage from "../../assets/trousers.png";
import tshirtImage from "../../assets/t-shirt.png";
import { useDispatch } from "react-redux";
import { add, sub } from "../../reducers/cartSlice";
const images = {
  capImage,
  trousersImage,
  tshirtImage,
};

function Item({ type, model, color, price, count,_id}) {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    e.preventDefault();
    if (selected + 1 <= count) {
      dispatch(add({ type, model, color, price,_id }));
      setSelected(selected + 1);

    }
  };
  const handleSub = (e) => {
    e.preventDefault();
    if (selected - 1 >= 0) {
      dispatch(sub({ type, model, color, price, _id }));
      setSelected(selected - 1);
    }
  };
  return (
    <div className="item-wrapper">
      <img
        className="item-image"
        src={
          type === "t-shirt" ? images["tshirtImage"] : images[type + "Image"]
        }
        alt="product"
      />
      <div className="item-prop">
        <strong>{type}</strong>
      </div>
      <div className="item-prop">{model}</div>
      <div className="item-prop">{color}</div>
      <div className="item-button-wrapper">
        <button onClick={handleAdd} className="item-add">
          +
        </button>
        <button onClick={handleSub} className="item-delete">
          -
        </button>
      </div>
      <div className="item-prop">{price}/each</div>
      <div className="total-cost">
        {selected ? `quantity: ${selected}` : ""}
      </div>
    </div>
  );
}

export default Item;
