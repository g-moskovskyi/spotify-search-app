import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.scss';
import Auth from './utils/auth.js';
import SearchBox from './components/search-box/search-box.jsx';
import TrackList from './components/track-list/track-list';
export default class App extends React.Component {
  constructor ( props ) {
    super( props );
    this.spotifyApi = new SpotifyWebApi();

    this.state = ( {
      hash: '',
      savedTracksItems: '',
      topTrackItems: '',
      searchedTracks: ''
    } );

  }
  componentDidMount () {
    this.login();
  }

  login () {
    let hash = JSON.parse( localStorage.getItem( 'hash' ) );
    if ( !hash ) {
      Auth();
      window.addEventListener( 'storage', () => {
        let hash = JSON.parse( localStorage.getItem( 'hash' ) );
        if ( !hash ) { this.login() }
        else {
          let hash = JSON.parse( localStorage.getItem( 'hash' ) );
          this.spotifyApi.setAccessToken( hash.access_token );
          this.setState( { hash: hash.access_token } );
        }
      } )
    }

    else {
      this.spotifyApi.setAccessToken( hash.access_token );
      this.setState( { hash: hash.access_token } )
    }
  }

  mySavedTracks = () => {
    this.spotifyApi.getMySavedTracks()
      .then( ( data ) => {
        localStorage.setItem( 'MySavedTracks', JSON.stringify( data ) );
        const mySavedTracks = JSON.parse( localStorage.getItem( 'MySavedTracks' ) ).items;
        let items = [];
        for ( let i in mySavedTracks ) {
          items.push( mySavedTracks[ i ].track )
        };
        this.setState( { savedTracksItems: items } );
      }, ( err ) => {
        console.error( err );
      } );
  }

  myTopTracks = () => {
    this.spotifyApi.getMyTopTracks()
      .then( ( data ) => {
        localStorage.setItem( 'MyTopTracks', JSON.stringify( data ) );
        this.setState( { topTrackItems: JSON.parse( localStorage.getItem( 'MyTopTracks' ) ).items } );
      }, ( err ) => {
        console.error( err );
      } );
  }

  searchTracks = ( value ) => {
    if ( value ) {
      let type = [ 'track' ];
      this.spotifyApi.search( value, type )
        .then( ( data ) => {
          localStorage.setItem( 'SearchedTracks', JSON.stringify( data ) );
          this.setState( () => (
            { searchedTracks: JSON.parse( localStorage.getItem( 'SearchedTracks' ) ).tracks.items } )
          )
        }, ( err ) => {
          console.error( err );
        } );
    }
  }

  moveTrack = ( type, id ) => {
    id = [ id ];
    if ( type === 'add' ) {
      this.spotifyApi.addToMySavedTracks( id )
        .then( () => {
          this.mySavedTracks();
        }
          , ( err ) => {
            console.error( err );
          } );
    }
    else if ( type === 'delete' ) {
      this.spotifyApi.removeFromMySavedTracks( id )
        .then( () => {
          this.mySavedTracks();
        }
          , ( err ) => {
            console.error( err );
          } );
    }
    else {
      console.log( 'Error: Type of Button is wrong' )
    }
  }

  render () {
    if ( !this.state.hash ) { return ( null ) }
    else {
      return (
        <div className='_page' >
          <section className="fav-section" >
            Here will be Favorite List

            < TrackList
              header='Saved tracks'
              trackRequest={ this.mySavedTracks }
              items={ this.state.savedTracksItems }
              button='delete'
              buttonFunc={ this.moveTrack }
            />
          </section >
          <section className="play-section">
            <header className="header" >
              Here will be Search - form
              <SearchBox
                searchTracks={ this.searchTracks }
                items={ this.state.searchedTracks } />
              < /header>
            <div className="list" >
                {/* < TrackList 
                trackRequest={ this.myTopTracks } 
                items={ this.state.topTrackItems } 
                button='add'
                buttonFunc={ this.moveTrack }/> */ }
                < TrackList
                  header='Finded traks'
                  trackRequest={ () => { } }
                  items={ this.state.searchedTracks }
                  button='add'
                  buttonFunc={ this.moveTrack }
                />
              </div >
          </section >
        </div>
          );
        }
      }
    }
