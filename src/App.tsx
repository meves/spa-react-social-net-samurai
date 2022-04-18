import React, { FC } from 'react';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store, { AppStateType } from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';
import { withSuspense } from './hoc/withSuspence';
import './css/App.css';

import { HeaderPage } from './components/Header/Header';
import { NavbarPage } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { LoginPage } from './components/Login/Login';
import Preloader from './components/common/Preloader/Preloader';

const DialogsPage = React.lazy(() => import('./components/Dialogs/Dialogs'));
const News = React.lazy(() => import('./components/News/News')); 
const Music = React.lazy(() => import('./components/Music/Music')); 
const UsersPage = React.lazy(() => import('./components/Users/UsersContainer')); 
const Settings = React.lazy(() => import('./components/Settings/Settings')); 

type PropsType = {
  initialized: boolean
  initializeApp: () => void
}

class App extends React.Component<PropsType> {
  catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
    // set globalError in app-reducer through thunk-creator and action-creator 
    // then show the error in ErrorComponent
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (    
        <div className="app-wrapper">
          <HeaderPage />
          <NavbarPage />
          <div className="app-wrapper-content">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/profile" /> }/>
              <Route path="/profile/:userId?" render={() => <Profile/>}/>
              <Route path="/dialogs" render={() => withSuspense(DialogsPage) } />
              <Route path="/users" render={() => withSuspense(UsersPage)}/>
              <Route path="/news" render={() => withSuspense(News)} />
              <Route path="/music" render={() => withSuspense(Music) } />
              <Route path="/settings" render={() => withSuspense(Settings)} />
              <Route path="/login" render={() => withSuspense(LoginPage)} />   
              <Route path="*" render={() => <div>404 NOT FOUND</div>}/>
            </Switch>         
          </div>        
        </div>    
    );
  }
}

type MapStatePropsType = {
  initialized: boolean
}

type MapDispatchPropsType = {
  initializeApp: () => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  initialized: state.app.initialized
});

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, { initializeApp })
    )(App);

const AppMain: FC = (props): JSX.Element => {
  return (
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
  );
}

export default AppMain;
