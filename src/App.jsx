import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.scss';
import auth_old from './utils/auth-old';
import Auth from './utils/auth.js';
import UserTopTracks from './components/user-top-tracks/user-top-tracks.jsx';
import UserSavedTracks from './components/user-saved-tracks/user-saved-tracks.jsx';
// import Header from './components/header/header.jsx';

export default class App extends React.Component {
  constructor ( props ) {
    super( props );
    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setAccessToken( props.accessToken );
    auth_old();
    // Auth();
  }

  render () {
    return (
      <div className='_page' >
        <section className="fav-section" >
          Here will be Favorite List < UserSavedTracks spotifyApi={ this.spotifyApi } />
        </section >
        <section className="play-section">
          <header className="header" >
            Here will be Search - form
          < /header>
          <div className="list" >
              Here will be Playlist
            < UserTopTracks spotifyApi={ this.spotifyApi } />
            </div >
        </section >
      </div>
        );
      }
    }

App.defaultProps = {
          client_id: '6b1ee17bdc7643e7a99a095bd321dbb2',
client_secret: 'cb274f971da1420183ac57deb1cc56f4',
redirect_uri: 'http://localhost',
scope: 'user-top-read user-library-modify user-read-private user-library-read',
stateKey: 'spotify_auth_state',
state: 'tY1RRH2mle0OIUjr',
accessToken: 'BQACY0qYYqRnQuPQrPztEJS4ycrjGZIBmvBzII-QKzZEN7xuBuDC31itx8OF_9hiv7bXxN_wHK_vRWlJ36iF2tj7hOfODM_XrzVuzCaAEd9LhTUC-ACp7gaTXeaEPARchO1FtK5XQL_SRyi64sfUokxnTk7mhgzH5W67qTXNj7E6ADe0HtuLhzFr6JDV-nyJZGKosfc'
}