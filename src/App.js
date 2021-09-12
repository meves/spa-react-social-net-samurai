import './css/App.css';
import Header from './components/Header/Header';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Profile from './components/Profile/Profile';
import NavbarContainer from './components/Navbar/NavbarContainer';

const App = (props) => {
  return (    
      <div className="app-wrapper">
        <Header />
        <NavbarContainer  />
        <div className="app-wrapper-content">
          <Route path="/profile" render={ () => <Profile /> } />
          <Route path="/dialogs" render={ () => <DialogsContainer /> } />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
        </div>
        
      </div>    
  );
}

export default App;
