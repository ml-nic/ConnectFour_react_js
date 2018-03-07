import React from 'react'
import Tile from './Tile'

//import '../styles/Board.css'

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.initBoard = this.initBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkGameState = this.checkGameState.bind(this);
    this.checkHorizontal = this.checkHorizontal.bind(this);
    this.checkVertical = this.checkVertical.bind(this);
    this.checkDiagonalUp = this.checkDiagonalUp.bind(this);
    this.checkDiagonalDown = this.checkDiagonalDown.bind(this);
    this.boardStyle = styles.boardStyle;
    this.buttonStyle = styles.buttonStyle;
    this.state = {
      board: undefined,
      currentPlayer: "r",
      gameFinished: false,
      winningPlayer: undefined,

    };

  }

  checkHorizontal(playerCheck, r, c, currentBoard, depth) {
    if (depth === 0) {
      return true
    }

    if (r > 6 || c > 6) {
      return false
    }

    if (currentBoard[r][c].props.occupant === playerCheck) {
      return this.checkHorizontal(playerCheck, r, c + 1, currentBoard, depth - 1)
    } else {
      return false
    }
  }

  checkVertical(playerCheck, r, c, currentBoard, depth) {
    if (depth === 0) {
      return true
    }

    if (r > 6 || c > 6) {
      return false
    }

    if (currentBoard[r][c].props.occupant === playerCheck) {
      return this.checkVertical(playerCheck, r + 1, c, currentBoard, depth - 1)
    } else {
      return false
    }
  }

  checkDiagonalUp(playerCheck, r, c, currentBoard, depth) {
    if (depth === 0) {
      return true
    }

    if (r > 6 || c < 0) {
      return false
    }

    if (currentBoard[r][c].props.occupant === playerCheck) {
      return this.checkDiagonalUp(playerCheck, r + 1, c - 1, currentBoard, depth - 1)
    } else {
      return false
    }
  }

  checkDiagonalDown(playerCheck, r, c, currentBoard, depth) {
    if (depth === 0) {
      return true
    }

    if (r < 0 || c < 0) {
      return false
    }

    if (currentBoard[r][c].props.occupant === playerCheck) {
      return this.checkDiagonalDown(playerCheck, r - 1, c - 1, currentBoard, depth - 1)
    } else {
      return false
    }
  }

  componentWillMount() {
    this.initBoard();
  }

  checkGameState() {
    const currentBoard = this.state.board;

    for (let r = 0; r < currentBoard.length; r++) {
      for (let c = 0; c < currentBoard.length; c++) {
        if (currentBoard[r][c].props.occupant !== undefined) {
          let playerCheck = currentBoard[r][c].props.occupant;
          //check horizontal
          if (this.checkHorizontal(playerCheck, r, c + 1, currentBoard, 3)) {
            this.setState({
              gameFinished: true,
              winningPlayer: playerCheck
            })
          }
          //check vertical
          else if (this.checkVertical(playerCheck, r + 1, c, currentBoard, 3)) {
            this.setState({
              gameFinished: true,
              winningPlayer: playerCheck
            })
          }
          //
          // //check diagonal-up
          else if (this.checkDiagonalUp(playerCheck, r + 1, c - 1, currentBoard, 3)) {
            this.setState({
              gameFinished: true,
              winningPlayer: playerCheck
            })
          }
          // //check diagonal-down
          //
          else if (this.checkDiagonalDown(playerCheck, r - 1, c - 1, currentBoard, 3)) {
            this.setState({
              gameFinished: true,
              winningPlayer: playerCheck
            })
          }
        }
      }
    }
  }

  handleClick(row, col, occupant) {
    let nextBoard = this.state.board;
    let emptyTileRow;
    for (let r = 0; r < this.state.board.length; r++) {
      if (nextBoard[r][col].props.occupant === undefined) {
        emptyTileRow = r;
      }
    }
    nextBoard[emptyTileRow][col] = <Tile handleClick={this.handleClick}
                                         key={col + "," + row}
                                         row={row}
                                         col={col}
                                         occupant={this.state.currentPlayer}/>;
    if (this.state.currentPlayer === "b") {
      this.setState({currentPlayer: "r"})
    } else {
      this.setState({currentPlayer: "b"})
    }
    this.setState({
      board: nextBoard
    });
    this.checkGameState()
  }

  initBoard() {
    const temp_board = [];
    for (let row = 0; row < 7; row++) {
      let row_array = [];
      for (let col = 0; col < 7; col++) {
        row_array.push(<Tile
            handleClick={this.handleClick}
            key={col + "," + row}
            row={row}
            col={col}
            occupant={undefined}
        />)
      }
      temp_board.push(row_array)
    }
    this.setState({
      board: temp_board
    })
  }

  render() {

    return (<div>
      <div style={this.boardStyle}>
        {this.state.board.map((row, r) => row.map((cell, c) => this.state.board[r][c]))}
      </div>
      <div style={this.buttonStyle}>
        <button onClick={this.initBoard}>Restart</button>
      </div>
    </div>)
  }
}

const styles = {
  boardStyle: {
    padding: '20px',
    backgroundColor: '#f4e2b6',
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
    gridGap: '10px',
    gridTemplateColumns: '40px 40px 40px 40px 40px 40px 40px ',
    gridTemplateRows: '40px 40px 40px 40px 40px 40px 40px '

  },
  buttonStyle: {
    paddingTop: '5vh',
    display: 'flex',
    justifyContent: 'center'
  }

};

export {Board as default}