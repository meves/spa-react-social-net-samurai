import React from 'react';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';
import { withSuspense } from './hoc/withSuspence';
import './css/App.css';

import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Preloader from './components/common/Preloader/Preloader';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const News = React.lazy(() => import('./components/News/News')); 
const Music = React.lazy(() => import('./components/Music/Music')); 
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer')); 
const Settings = React.lazy(() => import('./components/Settings/Settings')); 
const Login = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();        
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (    
        <div className="app-wrapper">
          <HeaderContainer />
          <NavbarContainer  />
          <div className="app-wrapper-content">
            <Route path="/profile/:userId?" render={() => withSuspense(ProfileContainer) }/>
            <Route path="/dialogs" render={() => withSuspense(DialogsContainer) } />
            <Route path="/users" render={() => withSuspense(UsersContainer)}/>
            <Route path="/news" render={() => withSuspense(News)} />
            <Route path="/music" render={() => withSuspense(Music) } />
            <Route path="/settings" render={() => withSuspense(Settings)} />
            <Route path="/login" render={() => withSuspense(Login)} />
          </div>        
        </div>    
    );
  }
}

const mapStateToprops = (state) => ({
  initialized: state.app.initialized
});

const AppContainer = compose(withRouter, connect(mapStateToprops, {initializeApp}))(App);

const AppMain = (props) => {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
  );
}

export default AppMain;
