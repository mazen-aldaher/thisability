import CryptoJS from "crypto-js";

import { RootState } from "./services/redux/rootReducer";

export const storeStorageKey = "appState";

const encryptionKey =
  process.env.REACT_APP_localStorageKey != null
    ? process.env.REACT_APP_localStorageKey
    : "localEnvironmentKey";

export const encrypt = (input) => {
  return CryptoJS.AES.encrypt(JSON.stringify(input), encryptionKey).toString();
};

export const decrypt = (input) => {
  return CryptoJS.AES.decrypt(input, encryptionKey).toString(CryptoJS.enc.Utf8);
};

export const persistedState = () => {
  try {
    return JSON.parse(decrypt(localStorage.getItem(storeStorageKey)));
  } catch (e) {
    return {};
  }
};
