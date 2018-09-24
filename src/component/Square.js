import React from 'react';
import  './Square.css'

export default class Square extends React.Component {
    render() {
        return (
            <button className= {this.props.isHighlight ? "highlightWinner":"square"} onClick={(this.props.dissable) ? null : this.props.onClick}>{this.props.value} </button>
        );
    }
}