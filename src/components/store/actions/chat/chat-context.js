import { useContext } from "react";
import { UserAuth } from "../../../context/AuthContext";

export const CHANGE_USER = "CHANGE_USER";

export function getChatdata(user, currentUser) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_USER,
      payload: { user, currentUser },
    });
  };
}
