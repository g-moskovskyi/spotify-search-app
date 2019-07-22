import React from 'react';
import './playlist.scss';
import ListItem from '../list-item/list-item.jsx'

export default class Playlist extends React.Component {
    constructor ( props ) {
        super( props );
        this.listItems = this.getListItem( props.items );
    }

    getListItem ( items ) {
        return ( items.map( ( item ) =>
            <li key={ item.id.toString() }>
                <ListItem item={ item } />
            </li>
        ) );
    }

    render () {
        return (
            <ul>{ this.listItems }</ul>
        )
    }

}