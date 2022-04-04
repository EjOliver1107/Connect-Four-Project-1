/*----- constants -----*/
const LOOKUP = {
    '1': '#5af287',
    '-1': '#C600EB',
    'null': 'white'
};



/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references -----*/
const checkers = document.querySelectorAll('td div');
const message = document.querySelector('footer h1');
const rows = document.querySelectorAll('tr');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);


/*----- functions -----*/

init();

function init() {
    let idx = parseInt(evt.target.id.replace('cl', ''));
    board[idx] = null;
}

function render() {
    board.forEach(function(cl, idx) {
        checkers[idx].innerText = LOOKUP[cl];
    });
}
function handleMove(evt) {
    let idx = parseInt(evt.target.id.replace('cl', ''));
    board[idx] = turn;
    turn *=-1;

    render();
}