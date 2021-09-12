import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store';
import { Provider } from './StoreContext';

export const renderEntireTree = (state) => {
    ReactDOM.render(
        <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}
  
renderEntireTree(store.getState());

store.subscribe(() => {
    const state = store.getState();
    renderEntireTree(state);
});

reportWebVitals();
