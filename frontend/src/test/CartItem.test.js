import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../store/store";
import CartItem from "../components/cart/CartItem";
import { TEST_ID } from "./consts";

const cartItem = {
  _id: "62fc0a8f794a6a5993c0e2af",
  type: "t-shirt",
  model: "x-101",
  color: "black",
  price: 79.99,
  value: 1,
};

const REF = {
  MAIN_COMPONENT: `${TEST_ID.CART_ITEM}${cartItem._id}`,
  TOTAL_COST: `${TEST_ID.CART_ITEM_TOTAL_COST}${cartItem._id}`,
  MODEL: `${TEST_ID.CART_ITEM_MODEL}${cartItem._id}`,
};

const renderDefaultComponents = () =>
  render(
    <Provider store={store}>
      <CartItem {...cartItem} testId={REF.MAIN_COMPONENT} />
    </Provider>
  );

describe("Render default cart item", () => {
  test("render item", () => {
    renderDefaultComponents();
    expect(screen.getByTestId(REF.MAIN_COMPONENT)).toBeInTheDocument();
    expect(screen.getByTestId(REF.TOTAL_COST)).toBeInTheDocument();
    expect(screen.getByTestId(REF.MODEL)).toBeInTheDocument();

    expect(screen.getByTestId(REF.TOTAL_COST)).toHaveTextContent(`${cartItem.price} (${cartItem.value})`);
    expect(screen.getByTestId(REF.MODEL)).toHaveTextContent(cartItem.model);
  });
});
