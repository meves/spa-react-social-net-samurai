import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';

export const renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
        <BrowserRouter>
            <App state={state} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
  
renderEntireTree(store.getState());

store.subscribe(renderEntireTree);

reportWebVitals();
