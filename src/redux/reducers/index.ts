import {combineReducers} from 'redux';
import userSlice from './userSlice';
import {user} from '../apis/user.api';
import {main} from '../apis/main.api';
import {petsApi} from '../apis/pets.api';


export default combineReducers({
  userSlice,
  [user.reducerPath]: user.reducer,
  [main.reducerPath]: main.reducer,
  [petsApi.reducerPath]: petsApi.reducer,
});
