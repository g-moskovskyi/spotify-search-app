import React from 'react';
import './search-box.scss';



export default class SearchBox extends React.Component {
    constructor ( props ) {
        super( props );
        this.state = ( { value: '' } );
        this.loadsearch = this.loadsearch.bind( this );
    }
    loadsearch ( event ) {
        this.setState( { value: event.target.value } );
        this.props.searchTracks( this.state.value );
    }
    render () {
        return (
            <div className="search-box">
                <input type="text" value={ this.state.value } onChange={ this.loadsearch } placeholder="Search..." className="search-box_field" />
            </div>
        );
    }
}