import React from 'react';
import './track-button.scss';

export default class TrackButton extends React.Component {
    constructor ( props ) {
        super( props );
        if ( this.props.type === 'add' ) {
            this.value = '+'
        }
        else { this.value = '-' }
    }
    moveTrack = () => {
        this.props.buttonFunc( this.props.type, this.props.id )
    }
    render () {
        return ( <input
            type='button'
            className='track-button'
            value={ this.value }
            onClick={ this.moveTrack }>
        </input> )
    }
}