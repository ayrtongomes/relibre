import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';
import { history } from 'utils';
import { routerMiddleware } from 'connected-react-router';
import multi from 'redux-multi';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            multi,
            thunkMiddleware,
        ),
    ),
);

export default store;