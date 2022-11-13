import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for ( let x = 0; x < nrows; x++){
      let row = []
      for (let y = 0; y < ncols; y++) {
        // JMT: if number is greater than 5 return 't', else return 'f'
        row.push(chanceLightStartsOn() > 5 ? true : false)
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // JMT: using .every() to check if every element in the new board is equal to true
    return board.every(r => (
      r.every(c => c === true)
    ))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = [...oldBoard]

      // TODO: in the copy, flip this cell and the cells around it
      // JMT: cells around will be +1 and -1 on both the y and the x axis
      const cellsToFlip = [[y-1, x], [y+1, x], [y, x], [y, x-1],[y, x+1]]

      cellsToFlip.forEach(([yCoord, xCoord]) => { flipCell(yCoord, xCoord, boardCopy) })

      // TODO: return the copy
      return boardCopy
    });
  }


  // if the game is won, just show a winning msg & render nothing else
  // TODO
  if (hasWon()) {
    return <h1>You won!</h1>
  }


  // make table board
  // TODO
  return (
    <table>
      <thead>
        <tr>
          <td colSpan={3}><h1>Lights Out</h1></td>
        </tr>
      </thead>
      <tbody>
        { board.map((r,yIdx) => (
          <tr>
            {r.map((c,xIdx) => {
              // get our coord string ready to pass to the flipCellsAround()
              const coord = `${yIdx}-${xIdx}`
              // return our cell component
              return<Cell key={coord} flipCellsAroundMe={() => flipCellsAround(coord)} isLit={c} /> 
            })}
          </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default Board;
