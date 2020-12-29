/* eslint-disable import/prefer-default-export */
import { STORE_USER } from "./types";
// axios

export const storeUserData = (currentUser, isLoggedIn) => dispatch => {
  dispatch({
    type: STORE_USER,
    payload: {
      currentUser,
      isLoggedIn
    }
  });
};
