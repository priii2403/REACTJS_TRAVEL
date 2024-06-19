import * as Actions from "./card-context";

const initialState = {
  cardList: [],
  totalCard: 0,
};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CARD_LIST: {
      return {
        ...state,
        cardList: action.payload,
        totalCard: action.payload.length,
      };
    }
    default: {
      return state;
    }
  }
};
export default cardReducer;
