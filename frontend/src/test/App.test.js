import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "../store/store";
import App from "../components/App";
import { TEST_ID } from "./consts";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const howMuchItems = 8;
const firstItem = {
  _id: "62fc0a8f794a6a5993c0e2af",
  type: "t-shirt",
  model: "x-101",
  color: "black",
  price: 79.99,
};

const renderDefaultComponents = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe("APP test components", () => {
  test("to be in the document", async () => {
    renderDefaultComponents();
    expect(screen.getByTestId(TEST_ID.HEADER)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.ITEMS_WRAPPER)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.BTN_CART_ON)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(TEST_ID.BTN_CART_ON));

    // cart
    await waitFor(() => screen.findByTestId(TEST_ID.CART));
    expect(screen.getByTestId(TEST_ID.CART)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.CART_BUTTON_CLEAR)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.CART_BUTTON_EXIT)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID.CART_BUY_ITEMS)).toBeInTheDocument();
  });
});

describe("redux", () => {
  test("items", async () => {
    renderDefaultComponents();
    const emptyStore = store.getState();
    expect(emptyStore.items.status).toBe("loading");

    await sleep(1000);
    const fetchedStore = store.getState();
    expect(fetchedStore.items.items[0]).toMatchObject(firstItem);
    expect(fetchedStore.items.items.length).toBe(howMuchItems);
  });

  test("cart", async () => {
    renderDefaultComponents();
    await sleep(1000);
    const firstItemReduxBtnAdd = await screen.findByTestId(
      `${TEST_ID.ITEM_BUTTON_ADD}0`
    );
    const firstItemReduxBtnSub = await screen.findByTestId(
      `${TEST_ID.ITEM_BUTTON_SUB}0`);
    const secondItemReduxBtnSub = await screen.findByTestId(`${TEST_ID.ITEM_BUTTON_SUB}1`);

    fireEvent.click(firstItemReduxBtnAdd);
    const storeAfterClickFirstItem = store.getState();
    const firstItemFromCartStore = storeAfterClickFirstItem.cart.items[0];
    expect(firstItemFromCartStore).toMatchObject(firstItem);
    expect(storeAfterClickFirstItem.cart.totalCost).toBe(
      firstItemFromCartStore.price
    );

    // this should't change store
    fireEvent.click(secondItemReduxBtnSub);
    const storeAfterClickSecondItem = store.getState();
    expect(storeAfterClickSecondItem).toMatchObject(storeAfterClickFirstItem);

    // sub first item
    fireEvent.click(firstItemReduxBtnSub);
    const storeAfterSecondClickFirstItem = store.getState();
    expect(storeAfterSecondClickFirstItem.cart.items.length).toBe(0);
    expect(storeAfterSecondClickFirstItem.cart.totalCost).toBe(0);
  });
});
