import React from 'react';
import './navbar.scss';

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.items = this.props.items.map ((item)=> 
            <li className='menu-item' key={item.toString()}>
            {item}
            </li>);
    }
        render(){
        return(
            <ul className="menu">{this.items}</ul>
        )
    }
}

Navbar.defaultProps = {items:['YOUR LIBRARY','PLAYLIST']};