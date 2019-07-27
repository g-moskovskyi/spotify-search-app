import React from 'react';
import './user-top-tracks.scss';
import TrackList from '../track-list/track-list.jsx'


export default class UserTopTracks extends React.Component {

    componentDidMount () {
        this.props.myTopTracks();
    }

    render () {
        if ( !this.props.items || this.props.render ) {
            return ( null )
        }
        else {
            return (
                <TrackList items={ this.props.items } />
            )
        }
    }

}