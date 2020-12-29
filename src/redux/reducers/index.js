import { combineReducers } from 'redux';
import boardsReducer from './boardsReducer';
import boardReducer from './boardReducer';
import bannerReducer from './bannerReducer';


export default combineReducers({
  boards: boardsReducer,
  board: boardReducer,
  banner: bannerReducer

});
