import React from 'react';
import './track-list.scss';
import ListItem from '../list-item/list-item.jsx'
export default class TrackList extends React.Component {

    componentDidMount () {
        this.props.trackRequest()
    }

    getItemList = () => {
        let items = this.props.items;
        if ( !items ) { return null }
        else {
            return ( items.map( ( item ) =>
                <li key={ item.id.toString() }>
                    <ListItem
                        item={ item }
                        button={ this.props.button }
                        buttonFunc={ this.props.buttonFunc }
                        id={ item.id } />
                </li>
            ) );
        }
    }

    button = () => {
        if ( this.getItemList().length === 20 ) {
            return ( [ < button
                key={ this.getItemList().length }
                className="track-list__button"
                onClick={ () => { } }>
                More...</button > ] )
        }
        else { return null }
    }

    render () {
        if ( !this.props.items ) {
            return ( null )
        }
        else {
            return (
                <div className="track-list">
                    <header className="track-list__header">
                        { this.props.header.toUpperCase() }
                    </header>
                    <ul className='track-list__list'>
                        { this.getItemList() }
                    </ul>
                    { this.button() }
                </div>
            )
        }
    }
}