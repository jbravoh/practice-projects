import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

//Changed from a React.Component to a function component
function Square (props) {
  render() 
    return (
      <button 
        className="square" onClick = {props.onClick}>
        {props.value}
      </button>
    );
}

// Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
// the Square components are now controlled components. The Board has full control over them.
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      //Each time a player moves xIsNext will be flipped to determine which player goes next
      xIsNext: true, 
    }
  }

  handleClick(i) {
    // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
    const squares = this.state.squares.slice(); 
      //ignores click if someone has won
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
    //“X”s and “O”s can take turns
    squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
    //passes down function from the Board to the Square - square will call function when a square is clicked
    <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />
    );
  }
 
  render() {
    //declares a winner
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares [b] && squares [a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
