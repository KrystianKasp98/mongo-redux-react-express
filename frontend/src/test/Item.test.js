import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../store/store";
import Item from "../components/item/Item";
import { TEST_ID } from "./consts";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const firstItem = {
  _id: "62fc0a8f794a6a5993c0e2af",
  type: "t-shirt",
  model: "x-101",
  color: "black",
  price: 79.99,
};
const index = 0;

const REF = {
  MAIN_COMPONENT: `${TEST_ID.ITEM}${index}`,
  QUANTITY: `${TEST_ID.ITEM_QUANTITY}${index}`,
  PRICE: `${TEST_ID.ITEM_PRICE}${index}`,
  MODEL: `${TEST_ID.ITEM_MODEL}${index}`,
  COLOR: `${TEST_ID.ITEM_COLOR}${index}`,
  TYPE: `${TEST_ID.ITEM_TYPE}${index}`,
  BTN_ADD: `${TEST_ID.ITEM_BUTTON_ADD}${index}`,
  BTN_SUB: `${TEST_ID.ITEM_BUTTON_SUB}${index}`,
};

const renderDefaultComponents = () =>
  render(
    <Provider store={store}>
      <Item {...firstItem} testId={REF.MAIN_COMPONENT} index={index} />
    </Provider>
  );

describe("Render default item", () => {
  test("render item", () => {
    renderDefaultComponents();
    expect(screen.getByTestId(REF.MAIN_COMPONENT)).toBeInTheDocument();
    expect(screen.getByTestId(REF.QUANTITY)).toHaveTextContent("");
    expect(screen.getByTestId(REF.PRICE)).toHaveTextContent(
      `${firstItem.price}/each`
    );
    expect(screen.getByTestId(REF.MODEL)).toHaveTextContent(firstItem.model);
    expect(screen.getByTestId(REF.COLOR)).toHaveTextContent(firstItem.color);
    expect(screen.getByTestId(REF.TYPE)).toHaveTextContent(firstItem.type);
  });

  test("fire events item", async () => {
    renderDefaultComponents();
    const subItemBtn = await screen.findByTestId(REF.BTN_SUB);
    const addItemBtn = await screen.findByTestId(REF.BTN_ADD);
    fireEvent.click(addItemBtn);
    fireEvent.click(subItemBtn);
    expect(screen.getByTestId(REF.QUANTITY)).toHaveTextContent(``);
    fireEvent.click(addItemBtn);
    expect(screen.getByTestId(REF.QUANTITY)).toHaveTextContent(`quantity: 1`);
  });
});
