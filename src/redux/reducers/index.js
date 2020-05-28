import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { authentication } from './authenticate';
import { user } from './user';
import instituicao from './instituicao';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    authentication,
    user,
    instituicao
  });

export default createRootReducer;
