import React from 'react';
import './App.scss';
import authorization from '../src/utils/authorization/authorization';
// import Header from './components/header/header.jsx';
import Navbar from './components/navbar/navbar.jsx';
export default class App extends React.Component{
  render () {
    authorization();
    return (
      <div className= '_page'>
        <nav className="nav">
          It will be Navbar
          < Navbar / >
        </nav>
        <section className="content">
          <header className="header">It will be Search-form</header>
          <div className="playlist">It will be Playlist</div>
        </section>
      </div>
    );
  }
}