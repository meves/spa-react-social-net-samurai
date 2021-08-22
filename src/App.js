import './App.css';

const App = () => {
  return (
    <>
    <Header />
    <List />
    <Footer />
    </>
  );
}

const Header = () => {
  return (
    <h1>Header of top</h1>    
  );
};

const List = () => {
  return (
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
      <li>TypeScript</li>
      <li>React</li>
    </ul>
  );
};

const Footer = () => {
  return (
    <>
    <span>Author: Sergey Medvedkin</span>
    <span>tel:8-918-2538109</span>
    <span>email:meves.sergey@google.com</span>
    </>
  );
};

export default App;
