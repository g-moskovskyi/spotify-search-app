import React from 'react';
import './track-list.scss';
import ListItem from '../list-item/list-item.jsx'

export default class TrackList extends React.Component {

    componentDidMount () {
        this.props.trackRequest();
    }

    getItemList = ( items ) => {
        if ( !items ) { return null }
        else {
            return ( items.map( ( item ) =>
                <li key={ item.id.toString() }>
                    <ListItem item={ item } />
                </li>
            ) );
        }
    }

    render () {
        if ( !this.props.items ) {
            return ( null )
        }
        else {
            return (
                <ul>{ this.getItemList( this.props.items ) }</ul>
            )
        }
    }
}