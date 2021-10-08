import React from 'react';
import './css/App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

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
            <Route path="/profile/:userId?" render={() => <ProfileContainer/>} />
            <Route path="/dialogs" render={() => <DialogsContainer/>} />
            <Route path="/users" render={() => <UsersContainer/>}/>
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
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

export default compose(withRouter, connect(mapStateToprops, {initializeApp}))(App);
