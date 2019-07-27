import React from 'react';
import './list-item.scss';

export default class ListItem extends React.Component {
    constructor ( props ) {
        super( props );
        this.item = this.props.item;
        this.name = this.item.name;
        this.artists = this.artistsList( this.item );
    }

    artistsList ( item ) {
        let artistsList = [];
        for ( let i in item.artists ) {

            if ( +i === item.artists.length - 1 ) {
                artistsList.push( item.artists[ i ].name )
            }
            else {
                artistsList.push( ( item.artists[ i ].name + ', ' ) );
            }
        }
        return ( artistsList )
    }

    render () {
        return (
            <div className='list-item'>
                <div className="list-item__button">Add</div>
                <div className="list-item__track">
                    <div className="name">{ this.name }</div>
                    <div className="artist-name">{ this.artists }</div>
                </div>
            </div>
        )
    }
}