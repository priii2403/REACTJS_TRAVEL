import * as Actions from "./chat-context";
import { UserAuth } from "../../../context/AuthContext";

const initialState = {
  chatId: "",
  user: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_USER":
      const { user, currentUser } = action.payload; // Destructure user and currentUser from action payload
      // Calculate the chatId based on user and currentUser
      const chatId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      return {
        ...state,
        user: user,
        chatId: chatId,
      };

    default:
      return state;
  }
};
export default chatReducer;
