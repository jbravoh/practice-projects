import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

//Changed from a React.Component to a function component
function Square (props) {
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
  renderSquare(i) {
    return (
    //passes down function from the Board to the Square - square will call function when a square is clicked
    <Square 
      value={this.state.squares[i]}
      // board component now receives squares and onClick props from the Game component
      onClick={() => this.props.onClick(i)}
      />
    );
  }
 
  //Refactored the Board's render function as the game component is now rending the game's status
  render() {
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
  // create initial state for the game component within its constructor
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
    const squares = this.state.squares.slice(); 
      //ignores click if someone has won
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
    //“X”s and “O”s can take turns
    squares[i] = this.state.xIsNext ? 'X' : 'O'; 
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  
  // updated the Game component’s render function to use the most recent history entry to determine and display the game’s status
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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

reportWebVitals();
