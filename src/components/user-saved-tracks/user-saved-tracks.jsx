import React from 'react';
import './user-saved-tracks.scss';
import TrackList from '../track-list/track-list.jsx'
export default class UserSavedTracks extends React.Component {

    componentDidMount () {
        this.props.mySavedTracks();
    }

    render () {
        if ( !this.props.items ) {
            return ( null )
        }
        else {
            return (
                <TrackList items={ this.props.items } />
            )
        }
    }

}