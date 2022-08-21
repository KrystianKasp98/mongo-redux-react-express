import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";

import { add, sub } from "../../reducers/cartSlice";

import clickAdd from "../../assets/click-add.wav";
import clickSub from "../../assets/click-sub.wav";
import trousersImage from "../../assets/trousers.png";
import tshirtImage from "../../assets/t-shirt.png";
import capImage from "../../assets/cap.png";
import "./Item.css";
import { TEST_ID } from "../../test/consts";

const images = {
  capImage,
  trousersImage,
  tshirtImage,
};

function Item({ type, model, color, price, count, _id, testId, index }) {
  const [playClickAdd] = useSound(clickAdd);
  const [playClickSub] = useSound(clickSub);
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.cart.items[index]);

  const handle = (e, action = "add") => {
    e.preventDefault();
    switch (action) {
      case "add":
        if (cartItem?.value + 1 <= count || !cartItem) {
          playClickAdd();
          dispatch(add({ type, model, color, price, _id }));
        }
        break;
      case "sub":
        if (cartItem?.value - 1 >= 0) {
          playClickSub();
          dispatch(sub({ type, model, color, price, _id }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="item-wrapper" data-testid={testId}>
      <img
        className="item-image"
        src={
          type === "t-shirt" ? images["tshirtImage"] : images[type + "Image"]
        }
        alt="product"
      />
      <div className="item-prop">
        <strong data-testid={`${TEST_ID.ITEM_TYPE}${index}`}>{type}</strong>
      </div>
      <div className="item-prop" data-testid={`${TEST_ID.ITEM_MODEL}${index}`}>
        {model}
      </div>
      <div className="item-prop" data-testid={`${TEST_ID.ITEM_COLOR}${index}`}>
        {color}
      </div>
      <div className="item-button-wrapper">
        <button
          data-testid={`${TEST_ID.ITEM_BUTTON_ADD}${index}`}
          onClick={(e) => handle(e)}
          className="item-add"
        >
          +
        </button>
        <button
          data-testid={`${TEST_ID.ITEM_BUTTON_SUB}${index}`}
          onClick={(e) => handle(e, "sub")}
          className="item-delete"
        >
          -
        </button>
      </div>
      <div className="item-prop" data-testid={`${TEST_ID.ITEM_PRICE}${index}`}>
        {price}/each
      </div>
      <div
        className="total-cost"
        data-testid={`${TEST_ID.ITEM_QUANTITY}${index}`}
      >
        {cartItem?.value ? `quantity: ${cartItem?.value}` : ""}
      </div>
    </div>
  );
}

export default Item;