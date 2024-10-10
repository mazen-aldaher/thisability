import { configureStore } from "@reduxjs/toolkit";
import { encrypt, persistedState, storeStorageKey } from "./storeEncription";
import rootReducer from "./services/redux/rootReducer";

const newRootReducer = require("./services/redux/rootReducer").default;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState(),
});

store.subscribe(() => {
  localStorage.setItem(storeStorageKey, encrypt(store.getState()));
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./services/redux/rootReducer", () => {
    store.replaceReducer(newRootReducer);
  });
}

export default store;
