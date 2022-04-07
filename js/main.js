/*----- constants -----*/
const LOOKUP = {
    '1': '#5af287',
    '-1': '#C600EB',
    '0': 'white'
};



/*----- app's state (variables) -----*/
let board;
let turn;
let winner;
let result;
let tieArray;
/*----- cached element references -----*/
const slots = [...document.querySelectorAll('td')];
const currentTurn = document.querySelector('aside > div');
const rows = document.querySelectorAll('tr');
const markerEls = [...document.querySelectorAll('#markers> div')];
const message = document.querySelector('aside > h3');

/*----- event listeners -----*/
document.getElementById('markers').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);
/*----- functions -----*/
init();

function init() {
    board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    turn = 1;
    tieArray= [];
    render();
   
  } 

  function render() {
    board.forEach(function(colArr, colIdx){
      // console.log('colArr', colArr);
      colArr.forEach(function(cellVal, rowIdx) {
        // console.log('cellVall', cellVal);
        // console.log('rowIdx', rowIdx);
        const cellEl = document.getElementById(`cl${colIdx}r${rowIdx}`)
        // console.log('cellEl', cellEl);
        cellEl.style.backgroundColor = LOOKUP[cellVal];
        
      });
    });
    
  }
  function getWinner(colIdx, rowIdx) {
    return checkVertWin(colIdx, rowIdx) || checkHorzWin(colIdx, rowIdx);
  }

  function handleMove(evt) {
    const colIdx = markerEls.indexOf(evt.target);
        if (colIdx === -1) return;
        const colArr = board[colIdx];
        // console.log(colIdx);
        // console.log(colArr);
        const rowIdx = colArr.indexOf(0);
        colArr[rowIdx] = turn;
        turn *= -1;
        render();
        getWinner(colIdx, rowIdx);
        tieArray.push(1);
        tieCheck();
      }
      
      function checkVertWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count up
  let idx = rowIdx + 1; // initialize to one above 
  while (idx < board[idx].length && board[colIdx][idx] === player) {
    count++;
    idx++;
  }
  idx = rowIdx - 1; // initialize to one above 
  while (idx >= 0 && board[colIdx][idx] === player) {
    count++;
    idx--;
  }
  return count === 4 ? winner = true : null; 
}


//opposite
function checkHorzWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count right
  let idx = colIdx + 1; // initialize to one above 
  while (idx < board.length && board[idx][rowIdx] === player) {
    count++;
    idx++;
  }
  idx = colIdx - 1; // initialize to one above 
  while (idx >= 0 && board[idx][rowIdx] === player) {
    count++;
    idx--;
  }
  return count >= 4 ? winner = true: null;
}
function tieCheck() {
 
  if (tieArray.length === 42) {     
      message.innerHTML = 'There has been a stalemate!';
  }
}
