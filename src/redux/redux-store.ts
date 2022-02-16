import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import dialogReducer from './dialog-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import userReducer from './user-reducer';
import authReducer from './auth-reducer'; 
import { appReducer } from './app-reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

let rootReducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    userPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers( 
    applyMiddleware(thunk)));
    
// State type    
export type AppStateType = ReturnType<typeof store.getState>;
// Actions type
type PropertiesTypes<T> = T extends {[key: string] : infer U} ? U : "never";
export type ActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;

// @ts-ignore
window.__store__ = store;

export default store;
