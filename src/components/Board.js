import React from 'react';


export default function Board(props) {
    const renderSquare = (i) => {
        return <button className="square" onClick={() => props.onClick(i)}>
            {props.squares[i]}
        </button>
    }

    return (
        <div>
            <div className="border-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="border-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="border-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>

        </div>
    )
}
