import { createStore, combineReducers, applyMiddleware } from 'redux';
import dialogReducer from './dialog-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import userReducer from './user-reducer';
import authReducer from './auth-reducer'; 
import thunk from 'redux-thunk';

let reducers = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    userPage: userReducer,
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
