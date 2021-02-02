import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  console.log(props.value)
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  
  
  renderSquare(i) {
    
    return (
            <Square
              value={this.props.squares[i]}
              onClick={(i)=>{this.props.onClick(i)}}
            />
    );
  }

  render() {
    return (
      <div>
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

  constructor(props){
    super(props);
    this.state={
      history: [{
        squares: Array(9).fill(null),
      }],
      isFlag:true,

    }
  }

  handleClick(i){
    
    const history=this.state.history;
    const current=history[history.length -1];
    const squares=current.squares.slice();
    console.log(history[history.length -1])
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    console.log("helllo ji")
    squares[i]= this.state.isFlag ? 'X': 'O';

    this.setState({
      history:history.concat([{
        squares:squares}]),
      isFlag: !this.state.isFlag, 

    }
    )
    
}

  render() {
    const history=this.state.history;
    const current=history[history.length -1];
    const winner=calculateWinner(current.squares);
    let status;
    if(winner){
      status = 'Winner : ' + winner;
    }else{
      status= 'Next Player : ' + (this.state.isFlag ? 'X':'O'); 
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
          onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
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

