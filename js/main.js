/*----- constants -----*/
const LOOKUP = {
    '1': '#5af287',
    '-1': '#C600EB',
    '0': 'white'
};
const bogosBinted = {
  '1': 'Green',
  '-1': 'Purple'
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
    renderTurn();
    message.innerHTML = '';
    winner = null;
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
    renderMarkers();
  }
 
  function getWinner(colIdx, rowIdx) {
    return checkVertWin(colIdx, rowIdx) || checkHorzWin(colIdx, rowIdx) || checkForwardSlash(colIdx, rowIdx) || checkBackSlash(colIdx, rowIdx);
  }
  function renderMarkers() {
    
    markerEls.forEach(function(markerEl, colIdx) {
      markerEl.style.visibility = board[colIdx].includes(0) ? 'visible' : 'hidden';
    });
  }
  function handleMove(evt) {
    if (winner) return;
    const colIdx = markerEls.indexOf(evt.target);
        if (colIdx === -1) return;
        const colArr = board[colIdx];
        console.log('colIdx: ',colIdx);
        
        console.log(turn);
        const rowIdx = colArr.indexOf(0);
        colArr[rowIdx] = turn;
        turn *= -1;
        console.log('rowIdx: ',rowIdx);
        render();
        renderTurn();
        getWinner(colIdx, rowIdx);
        tieArray.push(1);
        tieCheck();
        winner = getWinner(colIdx, rowIdx);
        if (winner) {
          renderWin()
         
        }
      }
      function renderWin() {
        message.innerHTML = `Player ${bogosBinted[winner]} Wins!`;
        currentTurn.style.backgroundColor = LOOKUP[winner];
      }     
  function renderTurn() {
    currentTurn.style.backgroundColor = LOOKUP[turn];
   
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
  return count === 4 ? winner = player : null; 
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
  return count >= 4 ? winner = player: null;
}
function tieCheck() {
 
  if (tieArray.length === 42) {     
      message.innerHTML = 'Its a tie!';
  }
}

function checkBackSlash(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  //count right
  let idx1 = colIdx - 1;// initialize to one above 
  let idx2 = rowIdx + 1;
  while (idx1 >= 0  && idx2 < board[0].length && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2++;
  }
  idx1 = colIdx + 1; // initialize to one above 
  idx2 = rowIdx - 1;
  while (idx1 < board.length && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2--;
  }
  return count === 4 ? winner = player : null;
}

function checkForwardSlash(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1; 
  let idx1 = colIdx + 1; 
  let idx2 = rowIdx + 1;
  console.log('first set',idx1, idx2);

  while (idx1 < board[0].length  && idx2 < board.length && board[idx1][idx2] === player) {
    count++;
    idx1++;
    idx2++;
    console.log('up right')

  }
  idx1 = colIdx - 1; 
  idx2 = rowIdx - 1;
  console.log('second set',idx1, idx2);
  while (idx1 >= 0 && idx2 >= 0 && board[idx1][idx2] === player) {
    count++;
    idx1--;
    idx2--;
    console.log('down left')
  }
  return count === 4 ? winner = player : null; 
}
