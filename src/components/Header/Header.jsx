import s from './Header.module.css';

const Header = (props) => {
    return (
      <header className={s.header}>
        <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/d/df/FC_Krasnodar_2016_logo_new.svg/624px-FC_Krasnodar_2016_logo_new.svg.png" alt="FC Krasnodar" />
        <p>FC Krasnodar</p>
      </header>
    );
};

export default Header;