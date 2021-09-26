import { createStore, combineReducers } from 'redux';
import dialogReducer from './dialog-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import userReducer from './user-reducer';
import authReducer from './auth-reducer'; 

let reducers = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    userPage: userReducer,
    auth: authReducer
});

let store = createStore(reducers);

window.store = store;

export default store;
