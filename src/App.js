import './css/App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import UsersContainer from './components/Users/UsersContainer';

const App = (props) => {
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
        </div>
        
      </div>    
  );
}

export default App;
