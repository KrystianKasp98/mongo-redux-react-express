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
  count: 300,
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
    fireEvent.click(screen.getByText(/open/i));
    await waitFor(() => screen.findByTestId(TEST_ID.CART));

  });

  test("redux", async () => {
    renderDefaultComponents();
    const emptyStore = store.getState();
    expect(emptyStore.items.status).toBe("loading");
    await sleep(1000);
    const fetchedStore = store.getState();
    expect(fetchedStore.items.items[0]).toMatchObject(firstItem);
    expect(fetchedStore.items.items.length).toBe(howMuchItems);
  });
});
