import React, { useState, useEffect } from 'react'
import Board from './Board';


let historyKey = 'tic-tac-toe:history';
let stepKey = 'tic-tac-toe:step';

function Game() {
    const [history, setHistory] = useState(() => {
        let list = window.localStorage.getItem(historyKey)
        if (list) {
            return JSON.parse(list);
        } else {
            return [
                Array(9).fill(null),
            ];
        }
    })
    console.log(history)
    const [stepNumber, setStepNumber] = useState(() => {
        let step = window.localStorage.getItem(stepKey)
        if (step == null) {
            return 0;
        } else {
            return JSON.parse(step)
        }
    })
    const [xIsNext, setxIsNext] = useState(true);
    useEffect(() => {
        window.localStorage.setItem(historyKey, JSON.stringify(history))
        window.localStorage.setItem(stepKey, JSON.stringify(stepNumber))
    }, [history, stepNumber])

    const current = history[stepNumber];
    const winner = calculateWinner(current);
    const jumpTo = (step) => {
        setxIsNext((step % 2) === 0)
        setStepNumber(step)
    }
    function restartHandleler() {
        setHistory([
            Array(9).fill(null)

        ])
        setStepNumber(0)
        setxIsNext(true)
    }
    function handleClick(i) {
        let newHistory = history.slice(0, stepNumber + 1);
        console.log('newHistory', newHistory)
        const squares = [...current]
        console.log(current)
        if (winner || current[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...newHistory, squares])
        setxIsNext(!xIsNext)
        setStepNumber(newHistory.length)
    }
    const moves = history.map((step, index) => {
        console.log(index)
        const desc = index ? 'Go to #' + index : 'Start the Game';
        return (
            <li key={index}>
                <button onClick={() => { jumpTo(index) }}>
                    {desc}
                </button>
            </li>
        )
    });
    let status;
    if (winner) {
        status = 'Winner is ' + winner;
    } else if (!winner && stepNumber > 8) {
        status = 'draw click restart ';
    }
    else {
        status = 'Next Player is ' + (xIsNext ? 'X' : 'O');
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board onClick={(i) => handleClick(i)}
                    squares={current} />
                <button onClick={restartHandleler}>Restart</button>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ul>{moves}</ul>
            </div>

        </div>
    )
}
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
export default Game;