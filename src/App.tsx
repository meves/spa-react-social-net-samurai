import React, { FC } from 'react';
import { BrowserRouter, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store, { AppStateType } from './redux/redux-store';
import { initializeApp } from './redux/app-reducer';
import { withSuspense } from './hoc/withSuspence';
import './css/App.css';

import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import Preloader from './components/common/Preloader/Preloader';
const DialogsContainer = React.lazy((): any => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy((): any => import('./components/Profile/ProfileContainer'));
const News = React.lazy(() => import('./components/News/News')); 
const Music = React.lazy(() => import('./components/Music/Music')); 
const UsersContainer = React.lazy((): any => import('./components/Users/UsersContainer')); 
const Settings = React.lazy(() => import('./components/Settings/Settings')); 
const Login = React.lazy(() => import('./components/Login/Login'));

type PropsType = {
  initialized: boolean
  initializeApp: () => void
}

class App extends React.Component<PropsType> {
  catchAllUnhandledErrors = (reason: any, promise: any): any => {
    // set globalError in app-reducer through thunk-creator and action-creator 
    // then show the error in ErrorComponent
  }
  componentDidMount() {
    this.props.initializeApp();
    // @ts-ignore        
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    // @ts-ignore
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
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
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/profile" /> }/>
              <Route path="/profile/:userId?" render={() => withSuspense(ProfileContainer) }/>
              <Route path="/dialogs" render={() => withSuspense(DialogsContainer) } />
              <Route path="/users" render={() => withSuspense(UsersContainer)}/>
              <Route path="/news" render={() => withSuspense(News)} />
              <Route path="/music" render={() => withSuspense(Music) } />
              <Route path="/settings" render={() => withSuspense(Settings)} />
              <Route path="/login" render={() => withSuspense(Login)} />   
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

const mapStateToprops = (state: AppStateType): MapStatePropsType => ({
  initialized: state.app.initialized
});

const AppContainer: any = compose(
  withRouter,
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToprops, { initializeApp })
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
