import React from 'react';
import './css/App.css';
import { Route, withRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspence';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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
            <Route path="/users" render={() => <UsersContainer/>}/>
            <Route path="/news" render={() => withSuspense(News)} />
            <Route path="/music" render={() => withSuspense(Music) } />
            <Route path="/settings" component={Settings} />
            <Route path="/login" render={() => <Login/>} />
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
