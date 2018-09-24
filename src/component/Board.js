import React from 'react';
import Square from './Square'

import './Board.css'

export default class Board extends React.Component {
    renderSquare(i) {
        return <Square isHighlight={(this.props.highlight && this.props.highlight.indexOf(i) >=0 )? true : false} value={this.props.arrays[i]} key={i} dissable={this.props.dissable} onClick={() => this.props.onClick(i)}/>
    }

    createTable() {
        const length = Math.sqrt(this.props.arrays.length)
        let k =0 ;
        let table = []
        for (let i = 0; i < length; i++) {
            let children = []
            for (let j = 0; j < length; j++) {
                children.push(this.renderSquare(k));
                k++;
            }
            table.push(<div className="board-row" key={i}>{children}</div>)
        }
        return table
    }

    render() {
        return (
            <div>
                <div>Board</div>
                {this.createTable()}
            </div>
        );
    }
}