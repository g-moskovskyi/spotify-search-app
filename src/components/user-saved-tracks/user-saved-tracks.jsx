import React from 'react';
import './user-saved-tracks.scss';
import Playlist from '../playlist/playlist.jsx'


export default class UserSavedTracks extends React.Component {
    constructor ( props ) {
        super( props );
        this.items = this.getItems( props.spotifyApi );
    }

    getItems ( spotifyApi ) {
        spotifyApi.getMySavedTracks()
            .then( ( data ) => {
                localStorage.setItem( 'MySavedTracks', JSON.stringify( data ) );
            }, ( err ) => {
                console.error( err );
            } );

        const mySavedTracks = JSON.parse( localStorage.getItem( 'MySavedTracks' ) ).items;
        let items = [];
        for ( let i in mySavedTracks ) {
            items.push( mySavedTracks[ i ].track )
        };
        return ( items );
    }

    render () {
        return (
            <Playlist items={ this.items } />
        )
    }

}