import React from 'react';
import Board from './Board'

import './Game.css'

export default class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            arrays: Array(9).fill(null),
            xIsNext: true,
            stepNumber: 0,
            history: [],
            history2: [],
            cur: null,
            isAsc: true,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(i) {
        if (this.state.arrays[i]) return;
        const arrays = this.state.arrays.slice();
        arrays[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            arrays: arrays,
            xIsNext: !this.state.xIsNext,
            stepNumber: this.state.stepNumber + 1,
            history: [...this.state.history, { value: arrays[i], pos: i }],
            history2: [{ value: arrays[i], pos: i },...this.state.history2],
            cur: i,
        });
    }

    showHistory(cur) {
        let history =null;
        if(this.state.isAsc)
            history = this.state.history;
        else
            history = this.state.history2;
        let row = []
        for (let i = 0; i < history.length; i++) {
            row.push(<li className={history[i].pos === cur ? "highlight" : ""} key={i}>{history[i].value} - ({Math.floor(history[i].pos / 3)},{history[i].pos % 3})</li>)
        }
        return row;
    }

    btnSortClick() {
        this.setState({
            isAsc: !this.state.isAsc
        })
    }

    btnPlayClick() {
        this.setState({
            arrays: Array(9).fill(null),
            xIsNext: true,
            stepNumber: 0,
            history: [],
            history2: [],
            cur: null,
            isAsc: true,
        })
    }

    render() {
        const winner = calculateWinner(this.state.arrays)
        let status;
        if (winner) {
            status = "Winner is: " + this.state.arrays[winner[0]];
        } else if (this.state.stepNumber === 9) {
            status = "No one win";
        } else {
            status = "Next player is: " + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div>Game</div>
                <div className="game"><Board highlight={winner} dissable={winner ? true : false} arrays={this.state.arrays} onClick={this.handleClick} /></div>
                <div className="game-info">{status}</div>
                <div style={{ color: 'red', marginTop: 10, fontSize: 20 }}>History</div>
                <div>{this.showHistory(this.state.cur)}</div>
                <button className="btnSort" onClick={this.btnSortClick.bind(this)}>Sort</button>
                <br/>
                <button className={(winner || this.state.stepNumber === 9)? "btnPlayAgain":"hide"} onClick={this.btnPlayClick.bind(this)}>Play again</button>
            </div>
        );
    }
}

function calculateWinner(arrays) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (arrays[a] && arrays[a] === arrays[b] && arrays[a] === arrays[c]) {
            return lines[i];
        }
    }
    return null;
}