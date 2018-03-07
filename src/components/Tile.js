import React from 'react'

const Tile = ({handleClick, occupant, row, col}) => {
  const cellStyleRed = styles.cellStyleRed;
  const cellStyleBlue = styles.cellStyleBlue;
  const cellStyleEmpty = styles.cellStyleEmpty;



  if (occupant && occupant === "r") {

    return (<div onClick={(e) =>{handleClick(row, col, occupant)}} style={cellStyleRed}/>)
  } else if (occupant && occupant === "b") {
    return (<div onClick={(e) =>{handleClick(row, col, occupant)}} style={cellStyleBlue}/>)
  } else {
    return (<div onClick={(e) =>{handleClick(row, col, occupant)}} style={cellStyleEmpty}/>)
  }
};

const styles = {
  cellStyleEmpty: {
    border: '1px solid #342932',
    width: '40px',
    height: '40px'
  },
  cellStyleRed: {
    border: '1px solid #342932',
    backgroundColor: '#342932'
  },
  cellStyleBlue: {
    border: '1px solid #292A33',
    backgroundColor: '#a7aecc'
  }
};

export {Tile as default}