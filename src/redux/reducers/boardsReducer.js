import { FETCH_BOARDS, NEW_BOARD, DELETE_BOARD } from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOARDS:
      if (action.payload == null) {
        return {
          ...state,
          items: []
        };
      }
      else {
        return {
          ...state,
          items: action.payload
        };
      }
    case NEW_BOARD:
      return Object.assign({}, state, {
        items: state.items.concat(action.payload)
      });
    case DELETE_BOARD:
      const boardId = action.payload;
      const f =  state.items.filter(board => board.id !== boardId);
      console.log(f);

      return Object.assign({}, state, {
        items: state.items.filter(board => board.id !== boardId)
      });
    default:
      return state;
  }
}
