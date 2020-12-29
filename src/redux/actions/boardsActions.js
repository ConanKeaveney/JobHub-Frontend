import { FETCH_BOARDS } from './types';


export const fetchBoards = (boardData) => dispatch => {
      dispatch({
        type: FETCH_BOARDS,
        payload: boardData
      });
};



