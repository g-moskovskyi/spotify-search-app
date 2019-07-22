import React from 'react';
import './user-top-tracks.scss';
import Playlist from '../playlist/playlist.jsx'


export default class UserTopTracks extends React.Component {
    constructor ( props ) {
        super( props );
        this.items = this.getItems( props.spotifyApi );
    }

    getItems ( spotifyApi ) {
        spotifyApi.getMyTopTracks()
            .then( ( data ) => {
                localStorage.setItem( 'MyTopTracks', JSON.stringify( data ) );
            }, ( err ) => {
                console.error( err );
            } );
        return ( JSON.parse( localStorage.getItem( 'MyTopTracks' ) ).items );
    }

    render () {
        return (
            <Playlist items={ this.items } />
        )
    }

}