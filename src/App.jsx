import React from 'react';
import './App.scss';
import authorization from '../src/utils/authorization/authorization';
// import Header from './components/header/header.jsx';

export default class App extends React.Component{
  render () {
    authorization();
    return (
      <div className= '_page'>
        <section className="fav-section">
          Here will be Favorite List
        </section>
        <section className="play-section">
          <header className="header">Here will be Search-form</header>
          <div className="list">Here will be Playlist</div>
        </section>
      </div>
    );
  }
}